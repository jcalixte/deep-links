<template>
  <div class="link-share">
    <button class="button is-success" v-if="canShare" @click="share">
      share
    </button>
    <section v-else>
      <p>copy this url to share you deep link</p>
      <div class="field has-addons" :class="{ 'has-addons': canCopy }">
        <div class="control">
          <input type="text" readonly :value="urlToShare" class="input" />
        </div>
        <div class="control" v-if="canCopy">
          <a class="button is-info" @click="copy">
            {{ labelCopy }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const navigator: any
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Link } from '@/models/link'
import { getShareUrl } from '@/utils'

@Component
export default class LinkShare extends Vue {
  @Prop({ type: Object, required: true })
  link!: Link
  labelCopy = 'copy'

  share() {
    navigator.share({
      title: document.title,
      text: `Deep link: ${this.link.name}`,
      url: this.urlToShare
    })
  }

  async copy() {
    await navigator.clipboard.writeText(this.urlToShare)
    this.labelCopy = 'copied!'
    setTimeout(() => {
      this.labelCopy = 'copy'
    }, 1500)
  }

  get canCopy() {
    return !!navigator.clipboard
  }

  get canShare() {
    return !!navigator.share
  }

  get urlToShare(): string {
    return getShareUrl(this.link)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';

.link-share {
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 $spacing;
  }
}
</style>
