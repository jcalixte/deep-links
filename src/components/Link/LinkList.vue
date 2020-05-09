<template>
  <section class="link-list">
    <ul v-if="links.length">
      <li v-for="link in links" :key="link.slug" class="link-li">
        <LinkItem class="link-item" :link="link">
          <button class="button is-danger" @click="removeLink(link.slug)">
            delete
          </button>
        </LinkItem>
      </li>
    </ul>
    <p class="no-link" v-else>
      <router-link class="button is-primary" :to="{ name: 'LinkCreate' }"
        >New link</router-link
      >
    </p>
  </section>
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .link-li {
    margin: $spacing;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .link-item {
    flex: 1;
    gap: $spacing;
  }
}
</style>
