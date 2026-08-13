import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  registerVimeoPlayer,
  setExclusiveUnmuted,
} from '../../utils/videoCoordinator'

const BASE_VIMEO_PARAMS =
  'title=0&byline=0&portrait=0&loop=0&autoplay=1&autopause=0&playsinline=1&dnt=1'

const MAX_PLAYS = 1

function buildVimeoParams({ autoplay = true, controls = true } = {}) {
  const params = BASE_VIMEO_PARAMS.replace(
    'autoplay=1',
    `autoplay=${autoplay ? 1 : 0}`,
  )

  return `${params}&muted=1${controls ? '' : '&controls=0'}`
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
    setTimeout(resolve, 4000)
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

export default function HeroVideo({
  videoId,
  title = 'Caper Video',
  className = 'section d-block pt-30',
  layout = 'section',
  muted = false,
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
  const hasUnmutedRef = useRef(false)
  const playCountRef = useRef(0)

  useEffect(() => {
    playCountRef.current = 0
    hasUnmutedRef.current = false
    setIsPlaying(false)
  }, [videoId, pathname])

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

        player.on('ended', () => {
          playCountRef.current += 1
          if (playCountRef.current < MAX_PLAYS) {
            player.play().catch(() => {})
          }
        })

        player.on('play', () => setIsPlaying(true))
        player.on('pause', () => setIsPlaying(false))
        player.on('ended', () => setIsPlaying(false))
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
        playerRef.current.off('ended')
        playerRef.current.off('play')
        playerRef.current.off('pause')
        playerRef.current.destroy().catch(() => {})
      }
      playerRef.current = null
    }
  }, [videoId, isVisible, playerId])

  const handleTogglePlayback = async () => {
    const player = playerRef.current
    if (!player) return

    try {
      const paused = await player.getPaused()

      if (paused) {
        if (!hasUnmutedRef.current) {
          await setExclusiveUnmuted(playerId)
          await player.setMuted(false)
          await player.setVolume(1)
          hasUnmutedRef.current = true
        }
        await player.play()
      } else {
        await player.pause()
      }
    } catch {
      // Playback may be blocked until the player is fully ready.
    }
  }

  if (!videoId) return null

  const vimeoParams = buildVimeoParams({
    autoplay: false,
    controls: false,
  })

  const embed = (
    <div ref={containerRef} className="box-video">
      <div className="box-video__embed">
        {isVisible ? (
          <>
            <iframe
              key={`${pathname}-${videoId}`}
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
            {isPlaying ? (
              <button
                type="button"
                className="box-video__tap"
                onClick={handleTogglePlayback}
                aria-label={`Pause ${title}`}
              />
            ) : (
              <button
                type="button"
                className="box-video__control box-video__control--paused"
                onClick={handleTogglePlayback}
                aria-label={`Play ${title}`}
              >
                <span className="box-video__control-icon" aria-hidden="true">
                  <i className="fa-solid fa-play" />
                </span>
              </button>
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
