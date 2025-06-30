
import { useRef } from 'react'

interface DragonPower {
  immuneSystemStrength: number
  worldwideIPBlocks: number
  adminFortressLevel: number
  parabolicUniverseControl: number
}

export function TrainedDragonCore() {
  const dragonPower = useRef<DragonPower>({
    immuneSystemStrength: 999999999,
    worldwideIPBlocks: 50000000,
    adminFortressLevel: 100000000,
    parabolicUniverseControl: 100
  })

  return {
    dragonPower: dragonPower.current
  }
}
