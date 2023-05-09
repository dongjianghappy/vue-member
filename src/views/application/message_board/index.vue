<template>
<div class="container w1100 clearfix">
  <div class="w180 left">
    <v-aside :data="menu" title="留言板" :render="init" />
  </div>
  <div class="m0 right" style="width: 910px">
    <div class="module-wrap mb15">
      <div class="module-head p20">
        留言板
      </div>
      <Send :render="init" v-if="!currentUser" />
      <div class="module-content" style="padding: 25px 50px !important; min-height: 500px;">
        <div class="feedback-content-wrap" style="display:block;">
          <div class="feedback-content feedback-lists">
            <div style=" border-bottom:1px solid #eee; height:50px; line-height:50px;">
              <span>留言（{{dataList.length}}）</span>
            </div>
            <div class="feedback-list" style="background: none;" v-for="(item, index) in dataList" :key="index">
              <v-photo :data="item" />
              <p class="feedback-user">{{item.nickname}} {{item.times}}</p>
              <p><span class="mr10 pointer" @click="handleClick(item)" v-if="item.isreply && currentUser" style="color: #ffc09f">回复</span>{{item.content}}</p>
              <div class="reply_info" v-for="(data, i) in item.reply" :key="i">
                <v-photo :data="data" />
                <p>{{data.nickname}} {{data.times}}</p>
                <p><span class="mr10 pointer" @click="handleClick(data)" v-if="data.isreply && currentUser" style="color: #ffc09f">回复</span> {{data.content}}</p>
              </div>
            </div>
            <v-loding v-if="!loading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Form :showAlbum="true" :render="Grouping" v-model:showFlag="showAlbum" v-if="showAlbum" :data="currentData" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  computed,
  ref,
  onMounted,
  getUid
} from '@/utils'
import Send from './components/send.vue'
import Form from './components/form.vue'
import {
  feedback
} from '@/assets/const'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Send,
    Form
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const currentUser = computed(() => store.getters['user/currentUser']);
    let dataList: any = ref([])
    const currentData = ref({})
    const isreply = ref(false)
    const showAlbum = ref(false)
    const loading: any = ref(false)
    const menu: any = feedback;
    menu.map((item: any) => {
      item.name = currentUser.value ? item.names[0] : item.names[1]
      item.path = `/application?mod=feedback&item=${item.value}`
    })

    function init() {
      loading.value = false
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          item: route.query.item,
          uid: getUid()
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }

    function handleClick(param: any, item: any) {
      showAlbum.value = true
      currentData.value = item ? item : param
    }

    onMounted(init)

    return {
      component,
      dataList,
      loading,
      isreply,
      currentUser,
      menu,
      currentData,
      init,
      handleClick,
      showAlbum
    }
  }
})
</script>
