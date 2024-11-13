<template>
<ul class="tech-lists">
  <li class="relative" style="border-bottom: 1px dotted var(--default-border); padding:15px 0;" v-for="(item, index) in dataList.list" :key="index" @mouseover="hover(item)" @mouseleave="leave(item)">
    <p class="mb10 relative">
      <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
      <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
        {{item.title}}
      </span>
      <!-- <span v-if="item.summary !== ''">
        <i class="infos demoimg iconfont icon-article"></i>
      </span> -->
      <span v-if="item.visible === 'fans'">
        <i class="iconfont icon-fans" style="color: #de6c92"></i>
      </span>
      <span v-if="item.visible === 'privacy'">
        <i class="iconfont icon-permissions" style="color: #1976d2"></i>
      </span>
      <span v-if="item.image.length">
        <v-popover content="<i class='iconfont icon-img'></i>" arrow="lr" offset="right" :move="-70" :keys="`popover-img$-${index}`" type="hover">

          <div class="p10 w250">
            <img :src="item.image[0]" style="width: 100%" />
          </div>
        </v-popover>
      </span>
      
      <span class="right">
        <v-space>
          <!-- <v-button buttonType="button" class="mr5" style="border-radius: 30px;" v-if="loginuser.account === userInfo.account" @click="handleGraph(item)">
          <i class="iconfont icon-edit"></i>流程图
        </v-button> -->
          <span v-if="loginuser.account === userInfo.account" @click="handleedit(item)">
            编辑
          </span>
          <span v-if="loginuser.account === userInfo.account" @click="handleedit(item)">
            删除
          </span>
        </v-space>
      </span>
      <span class="mr25 right cl-666">{{item.times}}</span>
    </p>
    <p>
      <span class="operating f-fr font12 cl-666">
        <a class="cl-666">分类：{{item.parent || '未分类'}}</a> |
        <a title="阅读" data-model="partner" data-action="remove" data-id="22" class="remove cl-666">阅读({{item.visit}})</a> |
        <a title="评论" data-model="partner" data-action="remove" data-id="22" class="remove cl-666">评论({{item.comment}})</a>
      </span>
    </p>
    <div v-if="isShowBatch" style=" position: absolute; left: 0; top: 0; right: 0; bottom: 0"></div>
  </li>
</ul>

<Graph v-model:show="isshow" :data="{id: graphid, ...data}" v-if="isshow" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  ref,
  getUid
} from '@/utils'
import {
  visibles
} from '@/assets/const'
import Graph from '../../views/graph/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Graph
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    viewUrl: {
      type: String,
      default: ""
    },
    editUrl: {
      type: String,
      default: ""
    },
    graphUrl: {
      type: String,
      default: ""
    },
    isShowBatch: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const isshow: any = ref(false)
    const graphid: any = ref('')

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: `${props.viewUrl}&id=${param.id}`
      }))
    }

    function handleGraph(param: any) {
      isshow.value = true
      graphid.value = param.id
      const doc: any = document
      doc.body.parentNode.style.overflowY = "hidden";
    }

    function handleedit(param: any) {
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `${props.editUrl}&id=${param.id}`
      }))
    }

    function hover(item: any) {
      item.isEdit = true
    }

    function leave(item: any) {
      item.isEdit = false
    }

    return {
      visibles,
      graphid,
      handleclick,
      handleGraph,
      handleedit,
      hover,
      leave,
      isshow,
      loginuser,
      userInfo
    }
  }
})
</script>
