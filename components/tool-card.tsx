'use client'

import Link from 'next/link'
import { ToolIcon } from './tool-icon'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  id: string
  name: string
  description: string
  icon: string
  color: string
  href: string
  popular?: boolean
}

export function ToolCard({ name, description, icon, color, href, popular }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        {popular && (
          <span className="absolute -top-2 -right-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
            Popular
          </span>
        )}
        <div
          className={cn(
            'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white',
            color
          )}
        >
          <ToolIcon icon={icon} className="h-6 w-6" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Link>
  )
}
