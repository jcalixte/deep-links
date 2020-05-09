<template>
  <div class="link-create card">
    <section class="display-uri">
      <button class="button is-info" @click="displayUri = !displayUri">
        display URI
      </button>
      <code v-show="displayUri">{{ generatedURI }}</code>
    </section>
    <form @submit.prevent="submit">
      <div class="card-content">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input
              id="name"
              class="input is-rounded"
              type="text"
              placeholder="Associate a name with the deeplink"
              v-model="name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="prefix">Prefix</label>
          <div class="control">
            <input
              id="prefix"
              class="input is-rounded"
              type="text"
              autocorrect="off"
              autocapitalize="none"
              placeholder="e.g.: spotify"
              v-model="prefix"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="path">Path</label>
          <div class="control">
            <input
              id="path"
              class="input is-rounded"
              type="text"
              placeholder="e.g.: album:12345"
              v-model="path"
            />
          </div>
        </div>
        <fieldset>
          <legend class="is-subtitle is-2">
            <div>
              <span>Query parameters</span>
              <button
                class="button is-info is-light is-rounded"
                @click="addQuery"
              >
                add
              </button>
            </div>
          </legend>
          <QueryCreate
            v-for="(query, i) in queries"
            :key="i"
            :query="queries[i]"
          />
        </fieldset>
        <footer class="buttons is-centered">
          <button class="button is-primary" type="submit">
            create
          </button>
          <slot></slot>
        </footer>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { QueryString } from '@/models/queryString'
import { Link } from '@/models/link'
import { slug, generateUri } from '@/utils'

@Component({
  components: {
    QueryCreate: () => import('@/components/Query/QueryCreate.vue')
  }
})
export default class LinkCreate extends Vue {
  @Action
  addLink!: (link: Link) => void
  @Prop({ type: Object, default: () => null })
  link!: Link | null
  name = ''
  prefix = ''
  path = ''
  queries: QueryString[] = []
  displayUri = false

  mounted() {
    if (this.link) {
      this.name = this.link.name
      this.prefix = this.link.prefix
      this.path = this.link.path
      this.queries = this.link.queries
    }
  }

  submit() {
    if (!this.isFormValid) {
      return
    }
    this.addLink(this.newLink)
    this.$router.push({
      name: 'Link',
      params: {
        slug: this.newLink.slug
      }
    })
  }

  addQuery() {
    this.queries.push({
      key: '',
      value: ''
    })
  }

  get isFormValid() {
    return this.name && this.prefix
  }

  get sanitizedqueries(): QueryString[] {
    const hasValidKey = (key: string) => !!key
    const hasValidValue = (value: string | number) =>
      value !== '' && value !== null && value !== undefined

    return this.queries.filter(
      (query) => hasValidKey(query.key) && hasValidValue(query.value)
    )
  }

  get newLink(): Link {
    return {
      name: this.name,
      slug: slug(this.name),
      prefix: this.prefix.toLowerCase(),
      path: this.path,
      queries: this.sanitizedqueries
    }
  }

  get generatedURI(): string {
    return generateUri(this.newLink)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';

.link-create {
  max-width: 700px;
  margin: auto;

  header {
    margin: $spacing;
    padding: 1.5rem 0;
  }
}
fieldset {
  margin: $spacing 0;
  div {
    display: flex;
    align-items: center;
    gap: $spacing;
  }
}

.display-uri {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 $spacing;
  padding: $spacing 0;
}
</style>
