export const socials = {
  email: 'princeraj93193@gmail.com',
  github: 'https://github.com/devrajneesh006',
  linkedin: 'TODO_linkedin_url',
}

export function isPlaceholder(value) {
  return typeof value !== 'string' || value.startsWith('TODO_') || !value.trim()
}
