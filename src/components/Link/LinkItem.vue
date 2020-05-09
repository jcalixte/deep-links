<template>
  <div class="link-item">
    <h2 class="title is-2">{{ link.name }}</h2>
    <h4 class="subtitle is-4">
      <code>{{ uri }}</code>
    </h4>
    <LinkShare :link="link" />
    <LinkCreate :link="link" v-if="modify">
      <button class="button is-info" @click="modify = !modify">
        cancel
      </button>
    </LinkCreate>
    <div class="buttons is-centered" v-if="!modify">
      <button class="button is-primary" @click="go">go!</button>
      <button class="button is-info" @click="modify = !modify">
        modify
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Link } from '@/models/link'
import { generateUri } from '@/utils'

@Component({
  components: {
    LinkCreate: () => import('@/components/Link/LinkCreate.vue'),
    LinkShare: () => import('@/components/Link/LinkShare.vue')
  }
})
export default class LinkItem extends Vue {
  @Prop({ type: Object, required: true })
  link!: Link
  modify = false

  go() {
    location.href = generateUri(this.link)
  }

  get uri() {
    return generateUri(this.link)
  }
}
</script>

<style scoped lang="scss">
.link-item {
  text-align: center;
}
</style>
