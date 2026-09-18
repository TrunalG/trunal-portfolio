'use client'

import { HowIThinkReel } from '@/components/ui/HowIThinkReel'

interface ThinkingSectionProps {
  nextSectionRef?: React.RefObject<HTMLDivElement | null>
}

export function ThinkingSection({ nextSectionRef }: ThinkingSectionProps) {
  return <HowIThinkReel nextSectionRef={nextSectionRef} />
}
