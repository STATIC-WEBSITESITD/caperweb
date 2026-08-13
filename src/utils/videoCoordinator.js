const players = new Map()
let suppressEvents = false

export async function setExclusiveUnmuted(activeId) {
  suppressEvents = true
  try {
    const tasks = []
    for (const [id, player] of players) {
      if (id === activeId) continue
      tasks.push(
        player.setMuted(true).catch(() => {}),
        player.setVolume(0).catch(() => {}),
      )
    }
    await Promise.all(tasks)
  } finally {
    suppressEvents = false
  }
}

export function registerVimeoPlayer(id, player) {
  players.set(id, player)

  const onVolumeChange = async (data) => {
    if (suppressEvents || data.volume <= 0) return

    try {
      const isMuted = await player.getMuted()
      if (!isMuted) {
        await setExclusiveUnmuted(id)
      }
    } catch {
      // Ignore volume sync errors from destroyed players.
    }
  }

  player.on('volumechange', onVolumeChange)

  return () => {
    player.off('volumechange', onVolumeChange)
    players.delete(id)
  }
}

export function resetVideoCoordinator() {
  suppressEvents = true
  for (const player of players.values()) {
    player.destroy().catch(() => {})
  }
  players.clear()
  suppressEvents = false
}
