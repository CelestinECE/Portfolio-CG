// @ts-nocheck — compatibilité @types/react v19 / R3F v8 (JSX global non propagé)
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as THREE from 'three'

/* ─── Scène interne ─── */
function LogoScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  const svgData = useLoader(SVGLoader, '/models/logo-cg.svg')

  /* Extraction des formes SVG + détection couleur */
  const formes = useMemo(() => {
    const result: { key: string; shape: THREE.Shape; isRed: boolean }[] = []

    svgData.paths.forEach((path, i) => {
      const c = path.color

      // Ignorer le fond sombre (#212020)
      const estFond = c.r < 0.2 && c.g < 0.2 && c.b < 0.2
      if (estFond) return

      // Rouge si canal R dominant (D71C30, E91F33), blanc sinon (FDFDFD)
      const estRouge = c.r > 0.5 && c.g < 0.4

      SVGLoader.createShapes(path).forEach((shape, j) => {
        result.push({ key: `${i}-${j}`, shape, isRed: estRouge })
      })
    })

    return result
  }, [svgData])

  /* Tilt fluide basé sur la position de la souris + légère rotation idle */
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Idle subtil quand la souris est au centre
    const idleY = Math.sin(t * 0.35) * 0.07
    const idleX = Math.cos(t * 0.25) * 0.04

    groupRef.current.rotation.y +=
      (pointer.x * 0.55 + idleY - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x +=
      (-pointer.y * 0.35 + idleX - groupRef.current.rotation.x) * 0.05
  })

  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 8]} intensity={1.1} castShadow />
      {/* Halo rouge accent */}
      <pointLight position={[-150, 0, 200]} color="#ff2d55" intensity={0.9} />
      <pointLight position={[150, 50, 100]} color="#ffffff" intensity={0.4} />

      {/* Logo centré + scale */}
      <group ref={groupRef}>
        <group scale={[0.5, -0.5, 0.5]}>
          <Center>
            {formes.map(({ key, shape, isRed }) => (
              <mesh key={key} castShadow>
                <extrudeGeometry
                  args={[
                    shape,
                    {
                      depth: 45,
                      bevelEnabled: true,
                      bevelThickness: 4,
                      bevelSize: 3,
                      bevelSegments: 5,
                    },
                  ]}
                />
                <meshStandardMaterial
                  color={isRed ? '#D71C30' : '#FFFFFF'}
                  metalness={isRed ? 0.35 : 0.65}
                  roughness={0.2}
                  envMapIntensity={1}
                />
              </mesh>
            ))}
          </Center>
        </group>
      </group>
    </>
  )
}

/* ─── Wrapper Canvas — exporté et chargé dynamiquement depuis HeroSection ─── */
export default function LogoCG3D() {
  return (
    <div className="w-[540px] h-[440px] mx-auto">
      <Canvas
        camera={{ fov: 45, position: [0, 0, 620], near: 1, far: 2000 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <LogoScene />
      </Canvas>
    </div>
  )
}
