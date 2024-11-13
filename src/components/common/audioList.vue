<template>
  <v-popover content="<i class='iconfont icon-music'></i>音频"
             arrow="tb"
             offset="right"
             :move="-10"
             keys="popover-music"
             @onClick="handleclick">
    <div style="width: 550px; height: 260px;">
      <template v-if="dataList.length">
        <div class="module-wrap">
          <div class="module-head nobd font16">
            推荐音频：
          </div>
          <div class="module-content plr15"
               style="height: 205px; overflow-y: auto;">
            <div class="col-md-6 flex mb15"
                 v-for="(item, index) in dataList"
                 :key="index">
                 <div style="width: 25px"><v-audio :data="{...item, index, number: dataList.length}" /></div>
              
              <div class="nowrap" style="flex: 1" @click="chooseTopic(item)">
                {{item.music_name}}
              </div>
              <div class="font12 cl-666" style="width: 40px;" @click="handleCollect(item)">
                <span class="cl-primary" v-if="item.hascollect == '1'">取消</span>
                <span v-else>收藏</span>
              </div>
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
  watch,
  useStore,
  toBlob
} from '@/utils'

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
    const dataList: any = ref([])

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
      }).then(async res => {
        await toBlob(res.result)
        let newArr = res.result.map((item: any)=>{
          item.music_file = item.file
          delete item.file
          return item
        })
        dataList.value = newArr     
      })
    }

    function click(param: any) {
      const aaa: any = document.getElementsByClassName('popover-topic')
      aaa[0].click('aa')
    }

    function chooseTopic(data: any) {
      context.emit('onEmoji', data)
    }

    function handleCollect(param: any){
      store.dispatch('common/Fetch', {
        api: 'collect_music',
        data: {
          music: param.id
        }
      }).then(res => {
        if (res.ifSuccess === 2) {
          return
        }
         if (res.result.state === 1) {
          param.hascollect = 1
        } else {
          param.hascollect = 0
        }

      })
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
      handleclick,
      handleCollect
    }
  }
})
</script>
