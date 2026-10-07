import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.14em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-accent/30 bg-accent/10 text-accent-ink',
        secondary: 'border-accent-2/30 bg-accent-2/10 text-foreground',
        muted: 'border-border bg-surface-2 text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
