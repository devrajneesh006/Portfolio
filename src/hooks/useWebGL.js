import { useEffect, useState } from 'react'

export function useWebGL() {
  const [status, setStatus] = useState({ supported: true, lowPower: false, ready: false })

  useEffect(() => {
    let cancelled = false
    const lowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4
    let supported = true

    try {
      const canvas = document.createElement('canvas')
      supported = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
      )
    } catch {
      supported = false
    }

    if (!cancelled) setStatus({ supported, lowPower, ready: true })
    return () => {
      cancelled = true
    }
  }, [])

  return {
    ...status,
    shouldRender3D: status.ready && status.supported && !status.lowPower,
  }
}
