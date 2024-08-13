<template>
<div>
  <div class="con-list p25" v-for="(item, index) in dataList" :key="index">
    <div>
      <span class="right span-icon">
        <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
          <div style="width: 150px">
            <ul class="font14">
              <template v-if="loginuser.account === item.uid">
                <li @click="handleDelete(item.id)">删除</li>
                <li><v-download :data="{id: item.artid, uid: data.uid, nickname: data.nickname, file: item.content}" /></li>
              </template>
            </ul>
          </div>
        </v-popover>
      </span>
      <img :src="item.content" style="border-radius: 8px; width: 150px; height: auto; cursor: zoom-in;" v-if="item.type === 'img'" />
      <Video :data="item" v-else />
    </div>
    <div class="mt10 flex font12">
      <div style="flex: 1">
        <v-photos :sourceData="item" :nickname="true" />
        <span @click="handleClick(item)">
          <i class="iconfont icon-link font14" />查看
        </span>
        </div>
      <div class="align_right" style="flex: 1">{{item.times}}</div>
    </div>
  </div>
</div>
<v-loding v-if="!loading" />
</template>

<script setup lang="ts">
import Video from '../../components/TalkItem/components/video2.vue'
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid,
  onMounted
} from '@/utils'

const props: any = defineProps({
  sourceData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const dataList: any = ref([])
const loginuser = computed(() => store.getters['user/loginuser']);
const loading: any = ref(false)

function handleDelete(id: any) {
  store.dispatch('common/Fetch', {
    api: 'deleteContent',
    data: {
      id
    }
  }).then(res => {
    init()
    proxy.$hlj.message({
      type: 'info',
      msg: res.returnMessage
    })
  })
}

function init(){
  loading.value = false
  store.dispatch('common/Fetch', {
    api: "TalkContentCollect"
  }).then((res) => {
    loading.value = true
    dataList.value = res.result
  })  
}

function handleClick(param: any){
  router.push(`/${param.uid}/${param.short_url_id}`)
}
onMounted(init)
</script>
