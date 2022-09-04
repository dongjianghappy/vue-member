<template>
<ul class="tech-lists">
  <li class="relative" style="border-bottom: 1px dotted #ddd; padding:15px 0;" v-for="(item, index) in dataList.list" :key="index" @mouseover="hover(item)" @mouseleave="leave(item)">
    <p class="mb10 relative">
      <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
      <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
        {{item.title}}
      </span>
      <span v-if="item.summary !== ''">
        <i class="infos demoimg iconfont icon-article"></i>
      </span>
      <span v-if="item.image.length">
        <Popover content="<i class='iconfont icon-img'></i>" arrow="lr" offset="right" :move="-70" :keys="`popover-img$-${index}`" type="hover">

          <div class="p10 w250">
            <img :src="item.image[0]" style="width: 100%" />
          </div>
        </Popover>
      </span>
      <span class="font18 cl-ccc">({{item.times}})</span>
      <span class="right">
        <v-button buttonType="button" class="mr5" style="border-radius: 30px;" v-if="currentUser" @click="handleGraph(item)">
          <i class="iconfont icon-edit"></i>流程图
        </v-button>
        <v-button buttonType="button" class="mr5" style="border-radius: 30px;" v-if="currentUser" @click="handleedit(item)">
          <i class="iconfont icon-edit"></i>编辑
        </v-button>
        <v-button buttonType="button" style="border-radius: 30px;" v-if="currentUser" @click="handleedit(item)">
          <i class="iconfont icon-recycle"></i>删除
        </v-button>
      </span>
    </p>
    <p>
      <span class="operating f-fr font12 cl-ccc">
        <a class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
        <a title="阅读" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">阅读({{item.visit}})</a> |
        <a title="评论" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">评论({{item.comment}})</a>
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
import Popover from '@/components/packages/popover/index.vue';
import Graph from '../../views/graph/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover,
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
    const currentUser = computed(() => store.getters['user/currentUser']);
    const loginuser = computed(() => store.getters['user/loginuser']);
    const isshow = ref(false)
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
      graphid,
      currentUser,
      handleclick,
      handleGraph,
      handleedit,
      hover,
      leave,
      isshow
    }
  }
})
</script>
