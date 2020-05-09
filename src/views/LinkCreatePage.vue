<template>
  <div class="link-create-page">
    <h1 class="title is-1">Create a deep link</h1>
    <LinkCreate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LinkCreate from '@/components/Link/LinkCreate.vue'

@Component({
  components: {
    LinkCreate
  }
})
export default class LinkCreatePage extends Vue {}
</script>

<style scoped lang="scss">
.link-create-page {
  h1 {
    text-align: center;
  }
}
</style>
