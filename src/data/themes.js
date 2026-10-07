export const themes = [
  { id: 'ember', label: 'Ember', swatch: '#FF6B1A' },
  { id: 'chrome', label: 'Chrome', swatch: '#E5E7EB' },
  { id: 'paper', label: 'Paper', swatch: '#EA580C' },
  { id: 'gold', label: 'Gold', swatch: '#D4AF37' },
]

export const defaultTheme = 'ember'

export function isTheme(value) {
  return themes.some((theme) => theme.id === value)
}
