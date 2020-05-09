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
  const uri = `${link.prefix}://${link.path}/`
  const queryStrings = link.queries
    .map((param) => `${param.key}=${param.value}`)
    .join('&')

  return `${uri}?${queryStrings}`
}
