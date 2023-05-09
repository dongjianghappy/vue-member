<template>
<div class="relative">
  {{ssss}}
<div contenteditable="true" class="content-editable"  @blur="textBlur">
  {{data.speech}}
</div>
<span class="absolute" style="top: -30px; right: 0;"><Selectspeech action="edit"  @confirm="choose"/></span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore,
  onMounted
} from '@/utils'
import Selectspeech from './selectspeech.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Selectspeech
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['update:save'],
  setup(props, context) {
    const store = useStore();
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const showGraph = ref(false)
    const dataList: any = ref([])
    const drawer: any = ref(null)
    const List: any = ref([])
    const speech_lib: any = ref([])
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let result = init()
        dataList.value = result
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "speechLib",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function textBlur(e: any) {
      debugger
      props.data.speech = e.currentTarget.innerHTML
    }

    function choose(param: any){
      let str = ""
      param.map((item: any) => {
        str += item.name
      })
      props.data.speech = str
    }

    function submit() {
      debugger
      const Arrs: any = []
      checkedList.value.map((index: any) => {
        let arr = ""
        arr = dataList.value.filter((item: any) => item.id === index)
        Arrs.push(arr[0])
      })

      context.emit('update:save', Arrs)
    }

    // onMounted(() => {
    //   debugger
    //   
    // })

    return {
      isShow,
      textBlur,
      choose,
      showGraph,
      checkedList,
      speech_lib,
      List,
      dataList,
      drawer,
      submit
    }
  }
})
</script>

<style scoped>
.content-editable {
    /* width: calc(100% - 12px); */
    width: 100%;
    box-sizing: content-box;
    min-height: 1em;
    height: auto;
    line-height: 16px;
    text-shadow: none;
    background: 0 0;
    border: 2px solid #4e517a;
    box-shadow: none;
    box-sizing: border-box;
    outline: 0;
    padding: 6px;
    overflow: auto;
  }
</style>