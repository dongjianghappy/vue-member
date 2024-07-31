<template>
<label class="mr10" for="sycn">同步到动态</label>
<input id="sycn" type="checkbox" :checked="sync" @click="handleClick" />
</template>

<script setup lang="ts">
import {
  codings,
  defineProps,
  computed,
  ref,
  useStore
} from '@/utils'
import QrcodeVue from 'qrcode.vue'
const props: any = defineProps({
  sync: {
    type: Boolean,
    default: true
  }
})
const emit: any = defineEmits(['update:sync'])

function handleClick(e: any) {
  emit('update:sync', e.target.checked)
}
</script>
