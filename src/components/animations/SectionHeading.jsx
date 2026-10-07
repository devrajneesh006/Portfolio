import { Reveal } from '@/components/animations/Reveal'
import { TextReveal } from '@/components/animations/TextReveal'
import { cn } from '@/lib/utils'

export function SectionHeading({ eyebrow, title, description, align = 'left', className, headingId }) {
  return (
    <div className={cn('max-w-2xl section-heading', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal blur>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <TextReveal
        as="h2"
        text={title}
        delay={0.06}
        id={headingId}
        className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
      />
      {description ? (
        <Reveal delay={0.14} blur>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
