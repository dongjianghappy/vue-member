<template>

</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'
export default defineComponent({
  name: 'HomeView',
  components: {},
  props: {
    channel: {
      type: String,
      default: ""
    },
    isShowBatch: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    theme: {
      type: String,
      default: ""
    }
  },
  emits: ['update:theme'],
  setup(props, context) {
    const viewUrl: any = `/${props.channel}?item=view`
    const editUrl: any = `/${props.channel}?item=details&action=edit`
    const currentThem: any = ref("")

    function chooseTheme(id: any) {
      context.emit('update:theme', id)
      currentThem.value = id
    }

    return {
      viewUrl,
      editUrl,
      chooseTheme,
      currentThem
    }
  }
})
</script>
