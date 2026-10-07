import { Canvas } from '@react-three/fiber'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SceneCanvas({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 40 },
  onPointerMissed,
}) {
  const [containerRef, isInView] = useInView({ threshold: 0.01, once: false })
  const reducedMotion = useReducedMotion()

  return (
    <div ref={containerRef} className={`scene-canvas ${className}`} aria-hidden="true" data-visible={isInView}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion || !isInView ? 'demand' : 'always'}
        camera={camera}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        onPointerMissed={onPointerMissed}
        shadows={false}
      >
        {children}
      </Canvas>
    </div>
  )
}
