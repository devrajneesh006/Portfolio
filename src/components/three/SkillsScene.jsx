import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { SceneCanvas } from '@/components/providers/SceneCanvas'
import { useTheme } from '@/hooks/useTheme'

const layerNodes = [
  { label: 'Frontend', position: [1.35, 0.5, 0.1] },
  { label: 'Backend', position: [-1.25, -0.45, 0.15] },
  { label: 'Database', position: [0.1, 1.35, -0.1] },
]

function readThemeColor(name, fallback) {
  if (typeof window === 'undefined') return fallback
  return window.getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

function LayerNode({ label, position, color, onActiveSkill }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      scale={hovered ? 1.3 : 1}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
        onActiveSkill(`${label} layer`)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHovered(false)
        onActiveSkill('Hover a layer')
      }}
      onClick={(event) => {
        event.stopPropagation()
        onActiveSkill(`${label} layer`)
      }}
    >
      <icosahedronGeometry args={[0.2, hovered ? 1 : 0]} />
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        emissive={color}
        emissiveIntensity={hovered ? 1.1 : 0.55}
        roughness={0.3}
        metalness={0.25}
      />
    </mesh>
  )
}

function SkillsSceneContent({ accent, secondary, onActiveSkill }) {
  const group = useRef(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  return (
    <>
      <ambientLight intensity={0.9} color={accent} />
      <pointLight position={[3, 2, 4]} intensity={14} distance={8} color={accent} />
      <pointLight position={[-3, -1, 3]} intensity={9} distance={7} color={secondary} />
      <group ref={group}>
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.28}>
          <mesh>
            <icosahedronGeometry args={[0.82, 2]} />
            <MeshDistortMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.42}
              roughness={0.34}
              metalness={0.32}
              distort={0.24}
              speed={1.1}
            />
          </mesh>
        </Float>
        <mesh scale={1.55} rotation={[0.35, 0.2, 0.1]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent} transparent opacity={0.28} wireframe />
        </mesh>
        <mesh rotation={[1.05, 0.2, 0.1]}>
          <torusGeometry args={[1.65, 0.01, 8, 64]} />
          <meshBasicMaterial color={secondary} transparent opacity={0.48} />
        </mesh>
        {layerNodes.map((node) => (
          <LayerNode key={node.label} {...node} color={node.label === 'Backend' ? secondary : accent} onActiveSkill={onActiveSkill} />
        ))}
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={false}
        autoRotateSpeed={0}
        minPolarAngle={Math.PI / 3.1}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  )
}

function SkillsScene({ onActiveSkill = () => {} }) {
  const { theme } = useTheme()
  const [accent, setAccent] = useState(() => readThemeColor('--accent', '#FF6B1A'))
  const [secondary, setSecondary] = useState(() => readThemeColor('--accent-2', '#C9CDD3'))

  useEffect(() => {
    setAccent(readThemeColor('--accent', '#FF6B1A'))
    setSecondary(readThemeColor('--accent-2', '#C9CDD3'))
  }, [theme])

  return (
    <SceneCanvas
      camera={{ position: [0, 0, 4.6], fov: 38 }}
      onPointerMissed={() => onActiveSkill('Hover a layer')}
    >
      <SkillsSceneContent accent={accent} secondary={secondary} onActiveSkill={onActiveSkill} />
    </SceneCanvas>
  )
}

export default SkillsScene
