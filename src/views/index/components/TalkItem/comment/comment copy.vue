<template>
<div class="form-wrap">
  <div class="input-box">
    <div class="img-box">
      <v-photo :data="userInfo" :style="{width: '50px', height: '50px', borderRadius: '50%'}" />
    </div>
    <input type="text" v-model="data.content" placeholder="请输入评论信息" ref="Input">
  </div>
  <div style="padding: 10px 25px 0 80px;">
    <v-upload ref="upload" @imgList="image" file="talk" uploadtype="comment" :mask="true" maxLength="1" v-if="module.upload" />
  </div>
  <div class="operate">
    <div class="operate-left">
      <span class="infos p0">
        <v-expression @onEmoji="choose" v-if="module.choose_expression" />
      </span>
      <span class="infos" @click="upload.handleclick()" v-if="module.upload">
        <i class="iconfont icon-pic" />图片
      </span>
      <span class="infos" v-if="module.choose_user">
        <v-aite ref="refaite" :data="{flag: sssss, content: data.content}" @onEmoji="choose" @onClick="(e)=>sssss = e" />
      </span>
    </div>
    <button @click="sendComment" class="operate-right" :class="{disabled: !data.content}" :disabled="!data.content">评论</button>
  </div>
  <div class="content comment-content" v-if="!loading">
    <div class="comment-list" v-for="(item, index) in dataList" :key="index">
      <div class="photos">
        <v-photos :sourceData="item" />
      </div>
      <p class="m0">{{item.nickname}}</p>
      <p>{{item.times}}
        <Itembar />
      </p>
      <p>{{item.content}}</p>
      <p v-if="item.image.length>0">
        <Images :data="item" kind="comment" />
        <!-- <img :src="item.image[0]" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="showimg" style="border-radius: 4px; width: 125px; height: 125px; cursor: zoom-in;" /> -->
        </p>
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
import Form from './formsss.vue'
import Images from '../components/image.vue'
import Itembar from './itembar.vue'
export default defineComponent({
  name: 'HomeViewe',
  components: {
    Form,
    Images,
    Itembar
  },
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
    const module = computed(() => store.getters['user/config_talk'].talk_send_tool || []);
    const upload: any = ref(null);
    let Input: any = ref(null)
    let dataList: any = ref([])
    let content: any = ref("")
    const data: any = reactive({
      content: "",
      img: ""
    })
    let loading: any = ref(false)

    function int() {
      loading.value = true
      store.dispatch('common/Fetch', {

        api: 'ArtList',
        data: {
          coding: props.data.coding3,
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
          coding: props.data.coding3,
          artid,
          img: data.img,
          content: data.content
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

    // 监听图片上传
    function image(a: any) {
      data.img = a
    }

    // 选择表情或话题
    function choose(aa: any) {
      content.value = data.content + aa
    }

    onMounted(() => {
      Input.value.focus()
      int()
    })
    return {
      module,
      upload,
      data,
      image,
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
