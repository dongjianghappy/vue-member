<template>
<div class="module-wrap mb15 operation_wrap">
  <div class="module-head p20">
    专辑
  </div>
  <div class="module-content p10">
    <div class="row clearfix" v-if="dataList.length">
      {{item}}
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
        <div class="thumbnail p10 relative" style="background: #fff;; overflow: hidden;">
          <img :src="item.cover || item.image[0]" style="border-radius: 8px; width: 100%; height: 150px;">
          <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.name}}【{{item.num}}张】</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  watch,
  onMounted,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'HomeView',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    item: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      menu: [{
          name: "全部",
          path: ""
        },
        {
          name: "已审核",
          path: "audited"
        },
        {
          name: "未审核",
          path: "unAudited"
        },
        {
          name: "被退回",
          path: "returned"
        }
      ]
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // let m = route.query.mod;
    const codding: any = codings["picture"]
    const loginuser = computed(() => store.getters['user/loginuser']);

    function handleclick(param: any) {
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/appstore/?mod=${route.query.mod}&item=list&cat=${param.id}`
      }))
    }

    function handleclicks(param: any) {
      let query = ""
      if (param) {
        query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(`/appstore/?mod=${route.query.mod}${query}`)
    }
    return {
      handleclick,
      handleclicks
    }
  }
})
</script>
