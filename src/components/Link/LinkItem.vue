<template>
  <div class="link-item">
    <h1 class="title is-1">{{ link.name }}</h1>
    <button class="button is-primary" @click="go">go!</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Link } from '@/models/link'
import { generateUri } from '../../utils'

@Component
export default class LinkItem extends Vue {
  @Prop({ type: Object, required: true })
  link!: Link

  go() {
    location.href = generateUri(this.link)
  }
}
</script>

<style scoped lang="scss">
.link-item {
}
</style>
