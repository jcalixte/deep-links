<template>
  <ul class="link-list">
    <li v-for="link in links" :key="link.slug" class="link-li">
      <LinkItem :link="link" />
      <button class="button is-danger" @click="removeLink(link.slug)">
        delete
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Link } from '@/models/link'
import LinkItem from '@/components/Link/LinkItem.vue'

@Component({
  components: {
    LinkItem
  }
})
export default class LinkList extends Vue {
  @Getter
  links!: Link[]
  @Action
  removeLink!: (slug: string) => void
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';

.link-list {
  .link-li {
    margin: $spacing;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
