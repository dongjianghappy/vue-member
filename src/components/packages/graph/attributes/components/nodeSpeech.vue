<template>
<v-tabs :tabs="tabMenu">
  <template v-slot:content1>

    <div>
      <span @click="handleSpeech"><i class="iconfont" :class="`icon-anonymous-iconfont`" />添加话术</span>
    </div>
    <ul class="form-wrap-box">

      <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.basicSpeech" :key="index">
        <div class="label">{{index+1}}、 <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'basicSpeech')" /></span></div>
        播报话术:
        <Broadcast :speech="item.speech" />
        <Speech :data="item" />
      </li>
    </ul>
  </template>
  <template v-slot:content2>
    <div>
      <Intention action="edit" @save="choose($event, 'objectionIntention')" :data="data && data.objectionIntention" />
    </div>
    <ul class="form-wrap-box">

      <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.objectionIntention" :key="index">
        <div class="label">{{item.name}} <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'objectionIntention')" /></span></div>
        播报话术:
        <Broadcast :speech="item.speech" />
        <Speech :data="item" />
      </li>
    </ul>
  </template>
  <template v-slot:content3>
    <div>
      <Intention action="edit" @save="choose($event, 'endIntention')" :data="data && data.endIntention" />
    </div>
    <ul class="form-wrap-box">

      <li class="p10 vertical" style="background: #464973;" v-for="(item, index) in data && data.endIntention" :key="index">
        <div class="label">{{item.name}} <span class="right"><i class="iconfont icon-close font12 pointer" @click="handleDelete(item, 'endIntention')" /></span></div>
        播报话术:
        <Broadcast :speech="item.speech" />
        <Speech :data="item" />
      </li>
    </ul>
  </template>
</v-tabs>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@/utils'
import Speech from './speech.vue'
import Intention from './selectIntention.vue'
import Selectspeech from './selectspeech.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Speech,
    Intention,
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
    let tabMenu: any = ref([{
        name: "基本",
        value: "appstore1"
      },
      {
        name: "异议",
        value: "appstore2"
      },
      {
        name: "结束",
        value: "appstore2"
      }
    ])

    function choose(param: any, name: any) {
      props.data[name] = param
    }

    function handleSpeech() {
      props.data.basicSpeech.push({
        speech: ""
      })
    }

    function handleDelete(param: any, name: any) {
      let index = props.data[name].findIndex((item: any) => item.id === param.id)
      props.data[name].splice(index, 1)
    }

    return {
      choose,
      tabMenu,
      handleSpeech,
      handleDelete
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
