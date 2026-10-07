export const socials = {
  email: 'TODO_email',
  github: 'TODO_github_url',
  linkedin: 'TODO_linkedin_url',
}

export function isPlaceholder(value) {
  return typeof value !== 'string' || value.startsWith('TODO_') || !value.trim()
}
