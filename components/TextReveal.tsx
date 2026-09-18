import { ElementType, ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  wrapClassName?: string
  itemClassName?: string
  as?: ElementType
}

export function TextReveal({ 
  children, 
  delay = 1, 
  wrapClassName = '', 
  itemClassName = '',
  as: Component = 'div' 
}: TextRevealProps) {
  return (
    <div className={`mask-reveal-wrap ${wrapClassName}`.trim()}>
      <Component className={`mask-reveal-item delay-${delay} ${itemClassName}`.trim()}>
        {children}
      </Component>
    </div>
  )
}
