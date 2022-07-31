<template>
<div id="tagInputContainer" class="tagInputContainer pr120" style="position:relative">
  <div class="tag-box" v-for="(item, index) in tags" :key="index"><span>{{item}}</span> <a class="deltag" href="javascript:;" title="删除" @click="remove(index)" v-if="isEdit">×</a></div>
  <input id="tInput" type="text" placeholder="请输入标签" style="border:0" v-model="model" v-if="isEdit" @blur="input">
  <!-- <div class="absolute w110"
         style="top: 5px; right: 5px;">
      <input id="open-search"
             type="checkbox"
             value="Y"
             checked="checked">
      <div class="absolute ml25 cl-ccc"
           style="top: -2px;">勾选快速检索</div>
    </div> -->
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  reactive
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:tags'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    let model: any = ref("")

    function input() {
      if (model.value !== "") {
        props.tags.push(model.value)
        model.value = ""
        context.emit('update:tags', props.tags)
      }
    }

    function remove(index: any) {
      props.tags.splice(index, 1)
      context.emit('update:tags', props.tags)
    }

    return {
      input,
      remove,
      model
    }
  }
})
</script>
