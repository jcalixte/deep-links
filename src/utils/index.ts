import { Link } from '@/models/link'
import { QueryString } from '@/models/queryString'

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

export const isValidQuery = (query: QueryString) => {
  const hasValidKey = (key: string) => !!key
  const hasValidValue = (value: string | number) =>
    value !== '' && value !== null && value !== undefined

  return hasValidKey(query.key) && hasValidValue(query.value)
}

export const getShareUrl = (link: Link): string => {
  if (!link) {
    return ''
  }
  link = JSON.parse(JSON.stringify(link))
  const url = new URL(`link/share/${link.slug}`, location.origin)
  url.searchParams.append('name', link.name)
  if (link.prefix) {
    url.searchParams.append('prefix', link.prefix)
  }
  if (link.path) {
    url.searchParams.append('path', link.path)
  }
  for (const query of link.queries) {
    if (isValidQuery(query)) {
      url.searchParams.append(`query-${query.key}`, `${query.value}`)
    }
  }
  return url.toString()
}
