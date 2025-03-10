import React, { useRef, useMemo } from 'react'
import {
  CrystalModel,
  AbstractOpal,
  AquaCrystal,
  CrystalHeart,
  IcyBlueCrystal,
  PinkCrystal,
  RedGreenCrystal,
  RedPurpleCrystal,
  RedPurpleCrystalCluster,
  VioletCrystal,
} from './Models'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AboutUsModels() {
  // Use useMemo to create refs for each model once
  const modelRefs = useMemo(() => Array.from({ length: 11 }, () => React.createRef<THREE.Mesh>()), [])
  const A = 5 // Amplitude of the figure-eight path

  // Define initial offsets for each model to space them out along the path
  const startPositions = useRef(
    Array.from({ length: modelRefs.length }, (_, i) => i * ((Math.PI * 2) / modelRefs.length)),
  )

  useFrame(() => {
    modelRefs.forEach((ref, i) => {
      if (ref.current) {
        // Update each model's position along the figure-eight path
        startPositions.current[i] += 0.001 // Adjust speed here
        if (startPositions.current[i] > Math.PI * 2) startPositions.current[i] = 0

        // Calculate x, y, z position using the figure-eight parametric equation
        const t = startPositions.current[i]
        const x = A * Math.sin(t)
        const y = 0 // Keep y constant or vary for vertical oscillation
        const z = A * Math.sin(t) * Math.cos(t)
        ref.current.position.set(x, y, z)
      }
    })
  })

  return (
    <>
      {/* Render each model along the figure-eight path */}
      <CrystalModel ref={modelRefs[0]} scale={0.1} rotation={[0, 0, 0]} />
      <AbstractOpal ref={modelRefs[1]} scale={0.001} rotation={[0, 0, 0]} />
      <AquaCrystal ref={modelRefs[2]} scale={3} rotation={[0, 0, 0]} />
      <CrystalHeart ref={modelRefs[3]} scale={0.5} rotation={[0, 0, 0]} />
      <IcyBlueCrystal ref={modelRefs[4]} scale={0.2} rotation={[0, 0, 0]} />
      <PinkCrystal ref={modelRefs[5]} scale={0.2} rotation={[0, 0, 0]} />
      <RedGreenCrystal ref={modelRefs[6]} scale={0.9} rotation={[0, 0, 0]} />
      <RedPurpleCrystal ref={modelRefs[7]} scale={0.02} rotation={[0, 0, 0]} />
      <RedPurpleCrystalCluster ref={modelRefs[8]} scale={0.01} rotation={[0, 0, 0]} />
      <VioletCrystal ref={modelRefs[9]} scale={0.002} rotation={[0, 0, 0]} />
    </>
  )
}
