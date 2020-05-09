import { QueryString } from './queryString'

export interface Link {
  name: string
  slug: string
  prefix: string
  path: string
  queries: QueryString[]
}
