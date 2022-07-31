<template>
  <div class="form-wrap"
       style="background: rgb(242, 242, 245);">
    <div class="content comment-content"
         v-if="!loading">
      <div class="feedback-list"
           v-for="(item, index) in dataList"
           :key="index"
           style="padding-left: 80px;">
        <img :src="item.photos"
             width="30"
             height="30"
             class="photos"
             style="left: 20px">
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
  <div class="layer-form-wrap absolute"
       style="left: 0; bottom: 0; right: 0">
    <div class="input-box">
      <input type="text"
             v-model="content"
             placeholder="请输入评论信息"
             ref="Input">
      <div class="expression">
        <v-expression @onEmoji="choose"
                      move="-100" />
      </div>
    </div>
    <div class="operate">
      <button @click="sendComment"
              class="operate-right"
              :class="{disabled: !content}"
              :disabled="!content">评论</button>
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
      ctx
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
          coding: "M0003",
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
          coding: "M0003",
          artid,
          content: content.value
        }
      }).then(res => {
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
