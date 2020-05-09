<template>
  <div class="link-share-page">
    <p>saving the link...</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Link } from '@/models/link'
import { QueryString } from '@/models/queryString'
import { Action } from 'vuex-class'

@Component
export default class LinkSharePage extends Vue {
  @Prop({ type: String, required: true })
  slug!: string
  @Action
  addLink!: (link: Link) => void

  created() {
    const url = new URL(location.href)
    const name = url.searchParams.get('name') ?? ''
    const prefix = url.searchParams.get('prefix') ?? ''
    const path = url.searchParams.get('path') ?? ''
    const queries: QueryString[] = []
    url.searchParams.forEach((searchParamKey) => {
      if (searchParamKey.startsWith('query-')) {
        const value = url.searchParams.get(searchParamKey)
        if (value) {
          const [, ...queryKey] = searchParamKey.split('-')
          queries.push({
            key: queryKey.join('-'),
            value
          })
        }
      }
    })
    const link: Link = {
      name,
      slug: this.slug,
      prefix,
      path,
      queries
    }
    this.addLink(link)
    this.$router.replace({
      name: 'Link',
      params: {
        slug: this.slug
      }
    })
  }
}
</script>
