<template>
  <div class="link-page">
    <section v-if="link">
      <LinkItem :link="link" />
    </section>
    <section v-else>
      <p>this link doesn't exist...</p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Link } from '@/models/link'
import LinkItem from '@/components/Link/LinkItem.vue'

@Component({
  components: {
    LinkItem
  }
})
export default class LinkPage extends Vue {
  @Getter
  links!: Link[]
  @Prop({ type: String, required: true })
  slug!: string

  get link() {
    return this.links.find((link) => link.slug === this.slug)
  }
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

.link-page {
  padding: $spacing;
}
</style>
