<template>
<v-popover content="<i class='iconfont icon-music'></i>音频" arrow="tb" offset="right" :move="-10" keys="popover-music" @onClick="handleclick">
  <div style="width: 450px; height: 260px;">
    <template v-if="dataList.length">
      <div class="module-wrap">
        <div class="module-head nobd font16">
          推荐音频：
        </div>
        <div class="module-content plr15" style="height: 205px; overflow-y: auto;">
            <div class="col-md-4 pb15" v-for="(item, index) in dataList" :key="index" @click="chooseTopic(item)">
              <v-audio :data="{...item, index, number: dataList.length}" />
              {{item.title}}
          </div>
        </div>
      </div>
    </template>
    <v-loding v-else />
  </div>
</v-popover>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  emits: ['onEmoji', 'onClick'],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([])

    // 监听路由
    watch(() => props.data, (newValues, prevValues) => {
      if (props.data.topicFlag) {
        let word_arr = props.data.content.split('#')

        if (word_arr[word_arr.length - 1].indexOf(" ") === -1) {
          init(word_arr[word_arr.length - 1])
        }
      }
    })

    function init(param: any = "") {

      store.dispatch('common/Fetch', {
        api: 'RecommendMusic',
        data: {
          word: param
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function click(param: any) {
      const aaa: any = document.getElementsByClassName('popover-topic')
      aaa[0].click('aa')
    }

    function chooseTopic(data: any) {
      context.emit('onEmoji', data)
    }

    function handleclick(param: any) {
      context.emit('onClick', param)
      if (!param) {
        return
      }
      init()
    }
    return {
      chooseTopic,
      dataList,
      click,
      handleclick
    }
  }
})
</script>
