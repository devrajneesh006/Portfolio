import { Toaster as Sonner } from 'sonner'

export function Toaster(props) {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'border border-border bg-surface text-foreground',
          description: 'text-muted-foreground',
          actionButton: 'bg-accent text-accent-foreground',
        },
      }}
      {...props}
    />
  )
}
