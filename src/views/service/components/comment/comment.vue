<template>
<div class="form-wrap">
  <div class="input-box">
    <div class="img-box">
      <v-photo :data="userInfo" :style="{width: '50px', height: '50px', borderRadius: '50%'}" />
    </div>
    <input type="text" v-model="content" placeholder="请输入评论信息" ref="Input">
  </div>
  <div class="operate">
    <div class="operate-left">
      <v-expression @onEmoji="choose" />
    </div>
    <button @click="sendComment" class="operate-right" :class="{disabled: !content}" :disabled="!content">评论</button>
  </div>
  <div class="content comment-content" v-if="!loading">
    <div class="comment-list" v-for="(item, index) in dataList" :key="index">
      <div class="photos"><v-photos :sourceData="item" /></div>
      <p class="feedback-user">{{item.nickname}}</p>
      <p>{{item.time}}</p>
      <p>{{item.content}}</p>
    </div>
  </div>
  <div v-else>
    <div class="load7 h60">
      <div class="loader">Loading...</div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  reactive,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewe',
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      summary: "",
    }
  },

  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const {
      coding3,
      id: artid,
      uid
    } = reactive(props.data)
    const userInfo = computed(() => store.getters['user/userInfo']);
    let Input: any = ref(null)
    let dataList: any = ref([])
    let content: any = ref("")
    let loading: any = ref(false)

    function int() {
      loading.value = true
      store.dispatch('common/Fetch', {

        api: 'ArtList',
        data: {
          coding: "U0680028",
          artid
        }
      }).then(res => {
        dataList.value = res.result.list
        loading.value = false
      })
    }

    function sendComment() {
      store.dispatch('common/Fetch', {

        api: 'Comment',
        data: {
          coding: "U0680028",
          artid,
          content: content.value
        }
      }).then(res => {
        if (res.ifSuccess === 0) {
          proxy.$hlj.message({
            msg: res.returnMessage
          })
          return
        }
        int()
      })

    }

    // 选择表情或话题
    function choose(aa: any) {
      content.value = content.value + aa
    }

    onMounted(() => {
      Input.value.focus()
      int()
    })
    return {
      Input,
      int,
      userInfo,
      sendComment,
      dataList,
      content,
      loading,
      choose
    }
  }
})
</script>
