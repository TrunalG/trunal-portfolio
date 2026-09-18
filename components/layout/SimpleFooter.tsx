import Link from 'next/link'

interface SimpleFooterProps {
  backLink: string
  backText: string
}

export function SimpleFooter({ backLink, backText }: SimpleFooterProps) {
  return (
    <footer className="simple-footer">
      <span>© Trunal 2026</span>
      <Link href={backLink}>
        {backText}
      </Link>
    </footer>
  )
}
