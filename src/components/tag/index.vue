<template>
<div id="tagInputContainer" class="tagInputContainer pr120" style="position:relative">
  <div class="tag-box" v-for="(item, index) in tags" :key="index"><span>{{item}}</span> <a class="deltag" href="javascript:;" title="删除" @click="remove(index)" v-if="isEdit">×</a></div>
  <input id="tInput" type="text" :placeholder="placeholder" style="border:0" v-model="model" v-if="isEdit" @blur="input">
  <div class="tag-box" v-if="tags.length == '0' && !isEdit">
    -
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
} from 'vue'

const props: any = defineProps({
  tags: {
    type: Array,
    default: () => []
  },
  isEdit: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: "请输入标签"
  }
})
const emit: any = defineEmits(['update:tags'])
let model: any = ref("")

function input() {
  if (model.value !== "") {
    props.tags.push(model.value)
    model.value = ""
    emit('update:tags', props.tags)
  }
}

function remove(index: any) {
  props.tags.splice(index, 1)
  emit('update:tags', props.tags)
}
</script>
