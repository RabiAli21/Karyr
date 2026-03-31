import Link from 'next/link'

interface LogoProps {
  inverted?: boolean
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

export default function Logo({ inverted = false, href = '/', size = 'md' }: LogoProps) {
  const cls = `font-display font-bold tracking-tight ${sizes[size]} ${inverted ? 'text-white' : 'text-black'}`
  const content = <span className={cls}>Karyr</span>
  return href ? <Link href={href}>{content}</Link> : content
}
