<template>
<v-popover ref="popover" content="<i class='iconfont icon-aite'></i>好友" arrow="tb" offset="right" :move="-10" :keys="keys || 'popover-aite'" @onClick="handleclick">
  <div style="width: 450px; height: 260px;">
    <template v-if="dataList.length">
      <div class="module-wrap">
        <div class="module-head nobd font14 cl-999">
          选择昵称或轻敲空格完成输入
        </div>
        <div class="module-content plr15 clearfix" style="height: 205px; overflow-y: auto;">
          <div class="left align_center" style="width: 60px;" v-for="(item, index) in dataList" :key="index" @click="chooseTopic(`${item.nickname}`)">
            <img :src="item.photos" onerror="this.src='http://www.yunxi10.com/source/public/images/head_normal_100.png'" class="photos p5" style="width: 50px; height: 50px; border-radius: 50%;">
            <div class="font12 nowrap">{{`${item.nickname}`}}</div>
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
  getUid,
  watch
} from '@/utils'
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
    },
    keys: {
      type: String,
      default: ""
    },
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref([])
    const popover: any = ref(null)

    // 监听路由
    watch(() => props.data, (newValues, prevValues) => {
      if (props.data.flag) {
        let word_arr = props.data.content.split('@')

        if (word_arr[word_arr.length - 1].indexOf(" ") === -1) {
          init(word_arr[word_arr.length - 1])
        }
      }
    })

    function init(param: any = "") {
      store.dispatch('common/Fetch', {
        api: 'MyconcernList',
        data: {
          word: param
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function click(param: any) {
      const aaa: any = document.getElementsByClassName(props.keys || 'popover-aite')
      aaa[0].click('aa')
    }

    function chooseTopic(data: any) {
      context.emit('onEmoji', `@${data} `)
    }

    function handleclick(param: any) {
      context.emit('onClick', param)
      if (!param) {
        return
      }
      init()
    }
    return {
      popover,
      click,
      chooseTopic,
      dataList,
      handleclick
    }
  }
})
</script>
