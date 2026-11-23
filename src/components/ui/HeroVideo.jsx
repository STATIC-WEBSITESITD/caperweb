import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  registerVimeoPlayer,
  setExclusiveUnmuted,
} from '../../utils/videoCoordinator'

const BASE_VIMEO_PARAMS =
  'title=0&byline=0&portrait=0&loop=0&autoplay=1&autopause=0&muted=1&playsinline=1&dnt=1&background=0'

const MAX_PLAYS = 1

function buildVimeoParams({ autoplay = true, controls = true } = {}) {
  const params = BASE_VIMEO_PARAMS.replace(
    'autoplay=1',
    `autoplay=${autoplay ? 1 : 0}`,
  ).replace('muted=1', `muted=${autoplay ? 1 : 0}`)

  return `${params}${controls ? '' : '&controls=0'}`
}

let vimeoApiPromise

function loadVimeoApi() {
  if (window.Vimeo) return Promise.resolve()
  if (!vimeoApiPromise) {
    vimeoApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://player.vimeo.com/api/player.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Vimeo API failed to load'))
      document.head.appendChild(script)
    })
  }
  return vimeoApiPromise
}

function waitForIframe(iframe) {
  return new Promise((resolve) => {
    try {
      if (iframe.contentDocument?.readyState === 'complete') {
        resolve()
        return
      }
    } catch {
      // Cross-origin iframe — fall through to load event.
    }

    iframe.addEventListener('load', () => resolve(), { once: true })
    setTimeout(resolve, 2500)
  })
}

function waitForPageReady() {
  if (!document.getElementById('preloader-active')) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const done = () => {
      observer.disconnect()
      resolve()
    }

    const check = () => !document.getElementById('preloader-active')

    if (check()) {
      resolve()
      return
    }

    const observer = new MutationObserver(() => {
      if (check()) done()
    })

    observer.observe(document.body, { childList: true, subtree: true })
    setTimeout(done, 600)
  })
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatVideoTime(seconds) {
  const total = Math.floor(seconds)
  const minutes = Math.floor(total / 60)
  const remainder = String(total % 60).padStart(2, '0')
  return `${minutes}:${remainder}`
}

export default function HeroVideo({
  videoId,
  title = 'Caper Video',
  className = 'section d-block pt-30',
  layout = 'section',
  autoplay = false,
  lazy = false,
}) {
  const { pathname } = useLocation()
  const playerId = useId()
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const unregisterRef = useRef(null)
  const initGenerationRef = useRef(0)
  const [isVisible, setIsVisible] = useState(!lazy)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(autoplay)
  const hasUnmutedRef = useRef(false)
  const playCountRef = useRef(0)
  const pendingSeekRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    playCountRef.current = 0
    hasUnmutedRef.current = false
    setIsPlaying(false)
    setIsMuted(autoplay)
    pendingSeekRef.current = null
    setCurrentTime(0)
    setDuration(0)
    setHasStarted(false)
  }, [videoId, pathname, autoplay])

  useEffect(() => {
    if (!lazy || !containerRef.current) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px', threshold: 0.2 },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [lazy])

  useEffect(() => {
    if (!isVisible || !videoId) return undefined

    const initGeneration = ++initGenerationRef.current
    const cancelledRef = { current: false }

    const isStale = () =>
      cancelledRef.current || initGeneration !== initGenerationRef.current

    const startAutoplay = async (player) => {
      // Browsers only allow autoplay when muted.
      await player.setMuted(true)
      await player.setVolume(0)
      setIsMuted(true)

      try {
        await player.setQuality('auto')
      } catch {
        // Some embeds disallow quality overrides; adaptive still applies.
      }

      for (let attempt = 0; attempt < 4; attempt += 1) {
        if (isStale()) return

        try {
          await player.play()
          const paused = await player.getPaused()
          if (!paused) {
            setIsPlaying(true)
            return
          }
        } catch {
          // Retry — Vimeo/player may not be ready yet.
        }

        await delay(350 * (attempt + 1))
      }
    }

    const syncPlaybackState = async (player) => {
      try {
        const paused = await player.getPaused()
        if (!isStale()) {
          setIsPlaying(!paused)
          if (!paused) setHasStarted(true)
        }
      } catch {
        // Ignore sync errors from a destroyed player.
      }
    }

    const initPlayer = async () => {
      await waitForPageReady()
      if (isStale()) return

      const iframe = containerRef.current?.querySelector('iframe')
      if (!iframe) return

      await waitForIframe(iframe)
      if (isStale()) return

      try {
        await loadVimeoApi()
        if (isStale()) return

        const player = new window.Vimeo.Player(iframe)
        playerRef.current = player
        await player.ready()
        if (isStale()) return

        unregisterRef.current = registerVimeoPlayer(playerId, player)

        const syncTimeline = ({ seconds, duration: total }) => {
          if (isStale()) return
          setHasStarted(true)
          if (!pendingSeekRef.current) setCurrentTime(seconds)
          setDuration(total)
        }

        player.on('timeupdate', syncTimeline)
        player.on('seeked', syncTimeline)
        player.on('ended', (progress) => {
          if (isStale()) return
          syncTimeline(progress)
          playCountRef.current += 1
          if (playCountRef.current < MAX_PLAYS) {
            player.play().catch(() => {})
          } else {
            setIsPlaying(false)
          }
        })

        player.on('play', () => {
          if (isStale()) return
          setIsPlaying(true)
          setHasStarted(true)
        })
        player.on('pause', () => setIsPlaying(false))
        player.on('volumechange', async () => {
          try {
            const muted = await player.getMuted()
            const volume = await player.getVolume()
            if (!isStale()) setIsMuted(muted || volume === 0)
          } catch {
            // Ignore volume sync errors from destroyed players.
          }
        })

        player.getDuration()
          .then((total) => {
            if (!isStale()) setDuration((knownDuration) => knownDuration || total)
          })
          .catch(() => {})

        await syncPlaybackState(player)

        if (autoplay) {
          await startAutoplay(player)
          if (!isStale()) await syncPlaybackState(player)
        }
      } catch {
        // URL params still allow muted playback when API init fails.
      }
    }

    initPlayer()

    return () => {
      cancelledRef.current = true
      unregisterRef.current?.()
      unregisterRef.current = null
      if (playerRef.current) {
        playerRef.current.off('timeupdate')
        playerRef.current.off('seeked')
        playerRef.current.off('ended')
        playerRef.current.off('play')
        playerRef.current.off('pause')
        playerRef.current.off('volumechange')
        playerRef.current.destroy().catch(() => {})
      }
      playerRef.current = null
    }
  }, [videoId, isVisible, playerId, autoplay, pathname])

  const handleTogglePlayback = async () => {
    const player = playerRef.current
    if (!player) return

    try {
      const paused = await player.getPaused()

      if (paused) {
        // User gesture — safe to unmute when they intentionally press play.
        if (!hasUnmutedRef.current) {
          await setExclusiveUnmuted(playerId)
          await player.setMuted(false)
          await player.setVolume(1)
          hasUnmutedRef.current = true
          setIsMuted(false)
        }
        await player.play()
        setIsPlaying(true)
      } else {
        await player.pause()
        setIsPlaying(false)
      }
    } catch {
      // Playback may be blocked until the player is fully ready.
    }
  }

  const handleToggleMute = async (event) => {
    event.stopPropagation()
    const player = playerRef.current
    if (!player) return

    try {
      if (isMuted) {
        await setExclusiveUnmuted(playerId)
        await player.setMuted(false)
        await player.setVolume(1)
        hasUnmutedRef.current = true
        setIsMuted(false)
      } else {
        await player.setMuted(true)
        await player.setVolume(0)
        setIsMuted(true)
      }
    } catch {
      // Ignore mute toggle errors from an unready player.
    }
  }

  const handleSeek = async (event) => {
    const player = playerRef.current
    if (!player || !hasStarted) return

    const seconds = event.currentTarget.valueAsNumber
    const request = {}
    pendingSeekRef.current = request
    setCurrentTime(seconds)

    try {
      const actualTime = await player.setCurrentTime(seconds)
      if (pendingSeekRef.current === request) setCurrentTime(actualTime)
    } catch {
      try {
        const actualTime = await player.getCurrentTime()
        if (pendingSeekRef.current === request) setCurrentTime(actualTime)
      } catch {
        // The player may have been removed during navigation.
      }
    } finally {
      if (pendingSeekRef.current === request) pendingSeekRef.current = null
    }
  }

  if (!videoId) return null

  const vimeoParams = buildVimeoParams({
    autoplay,
    controls: false,
  })

  const embed = (
    <div ref={containerRef} className="box-video">
      <div className="box-video__embed">
        {isVisible ? (
          <>
            <iframe
              key={`${pathname}-${videoId}-${autoplay}`}
              className="js-caper-video"
              data-video-id={videoId}
              src={`https://player.vimeo.com/video/${videoId}?${vimeoParams}`}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {!isPlaying && (
              <div className="box-video__overlay" aria-hidden="true" />
            )}
            <button
              type="button"
              className={`box-video__control ${
                isPlaying
                  ? 'box-video__control--playing'
                  : 'box-video__control--paused'
              }`}
              onClick={handleTogglePlayback}
              aria-label={`${isPlaying ? 'Pause' : 'Play'} ${title}`}
            >
              <span className="box-video__control-icon" aria-hidden="true">
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
              </span>
            </button>
            {autoplay && (
              <button
                type="button"
                className="box-video__mute"
                onClick={handleToggleMute}
                aria-label={isMuted ? `Unmute ${title}` : `Mute ${title}`}
              >
                <i
                  className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}
                  aria-hidden="true"
                />
              </button>
            )}
            {duration > 0 && (
              <div className="box-video__timeline">
                <input
                  className="box-video__seek"
                  type="range"
                  min={0}
                  max={duration}
                  step="any"
                  value={Math.min(currentTime, duration)}
                  disabled={!hasStarted}
                  onChange={handleSeek}
                  aria-label={`Seek ${title}`}
                  aria-valuetext={`${formatVideoTime(currentTime)} of ${formatVideoTime(duration)}`}
                  style={{
                    '--video-progress': `${Math.min(100, (currentTime / duration) * 100)}%`,
                  }}
                />
                <span className="box-video__time" aria-hidden="true">
                  {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="box-video__placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  )

  if (layout === 'embed') return embed

  return (
    <section className={className}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-10">
            {embed}
          </div>
        </div>
      </div>
    </section>
  )
}
