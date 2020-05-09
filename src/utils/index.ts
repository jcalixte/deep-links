import { Link } from '@/models/link'

export const slug = (text: string) => {
  if (!text) {
    return ''
  }
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export const generateUri = (link: Link) => {
  if (!link.prefix && !link.path) {
    return ''
  }
  const path = link.path ? `${link.path}/` : ''
  const uri = `${link.prefix}://${path}`
  const queries = link.queries.map((param) => `${param.key}=${param.value}`)
  const queryStrings = queries.length ? `?${queries.join('&')}` : ''

  return `${uri}${queryStrings}`
}
