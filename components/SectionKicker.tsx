import React from 'react'

interface SectionKickerProps {
  title: string
  note?: string
}

export function SectionKicker({ title, note }: SectionKickerProps) {
  return (
    <div className="section-kicker">
      <span>{title}</span>
      {note && <span className="kicker-note">{note}</span>}
    </div>
  )
}
