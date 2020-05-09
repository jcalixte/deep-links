<template>
  <div class="link-create card">
    <header>
      <h1 class="title is-1">Create a deep link</h1>
    </header>
    <form @submit.prevent="submit">
      <div class="card-content">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input is-rounded"
              type="text"
              placeholder="Associate a name with the deeplink"
              v-model="name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Prefix</label>
          <div class="control">
            <input
              class="input is-rounded"
              type="text"
              placeholder="ex: spotify"
              v-model="prefix"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Path</label>
          <div class="control">
            <input
              class="input is-rounded"
              type="text"
              placeholder="path"
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
                @click="addParam"
              >
                add
              </button>
            </div>
          </legend>
          <div
            class="columns"
            v-for="(param, key) in params"
            :key="`${key}-${param.key}`"
          >
            <div class="column">
              <label class="label">key</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="param key"
                  v-model="params[key].key"
                />
              </div>
            </div>
            <div class="column">
              <label class="label">value</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="param value"
                  v-model="params[key].value"
                />
              </div>
            </div>
          </div>
        </fieldset>
        <footer class="card-footer">
          <button class="button is-primary card-footer-item" type="submit">
            create
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { QueryString } from '@/models/queryString'
import { Link } from '@/models/link'
import { slug, generateUri } from '@/utils'

@Component
export default class LinkCreate extends Vue {
  name = ''
  prefix = ''
  path = ''
  params: QueryString[] = []
  @Action
  addLink!: (link: Link) => void

  submit() {
    if (!this.isFormValid) {
      return
    }
    this.addLink(this.link)
    this.$router.push({
      name: 'Link',
      params: {
        slug: this.link.slug
      }
    })
  }

  addParam() {
    this.params.push({
      key: '',
      value: ''
    })
  }

  get isFormValid() {
    return this.name && this.prefix
  }

  get sanitizedParams(): QueryString[] {
    const hasValidKey = (key: string) => !!key
    const hasValidValue = (value: string | number) =>
      value !== '' && value !== null && value !== undefined

    return this.params.filter(
      (param) => hasValidKey(param.key) && hasValidValue(param.value)
    )
  }

  get link(): Link {
    return {
      name: this.name,
      slug: slug(this.name),
      prefix: this.prefix.toLowerCase(),
      path: this.path,
      params: this.sanitizedParams
    }
  }

  get generatedURI(): string {
    return generateUri(this.link)
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.link-create {
  max-width: 700px;
  margin: auto;

  header {
    margin: $spacing;
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
</style>
