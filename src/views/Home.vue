<template>
  <div class="home">
    <LinkList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LinkCreate from '@/components/Link/LinkCreate.vue'
import LinkList from '@/components/Link/LinkList.vue'

@Component({
  components: {
    LinkCreate,
    LinkList
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
