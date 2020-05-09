<template>
  <div class="query-create columns">
    <div class="column">
      <label class="label" :for="`${query.key}-key`">key</label>
      <div class="control">
        <input
          :id="`${query.key}-key`"
          class="input"
          type="text"
          v-model="query.key"
        />
      </div>
    </div>
    <div class="column">
      <label class="label" :for="`${query.key}-value`">value</label>
      <div class="control">
        <input
          :id="`${query.key}-value`"
          class="input"
          type="text"
          v-model="query.value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { QueryString } from '@/models/queryString'

@Component
export default class QueryCreate extends Vue {
  @Prop({ type: Object, required: true })
  query!: QueryString
}
</script>

<style scoped lang="scss">
.query-create {
}
</style>
