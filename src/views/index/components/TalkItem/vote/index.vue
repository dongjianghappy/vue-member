<template>
<v-button @click="handleclick">
  <i class="iconfont icon-chart" title="参与投票" style="color: #ff3766;"></i>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="" width="950px" :style="{width: 600, height: 600}" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="module-wrap">
      <div class="module-content p15" style="padding-bottom: 25px !important; min-height: 500px">
        <div class="mb15 font18 bold align_center">
          {{detail.name}}</div>
        <div class="pt25 plr25" style=" text-indent: 30px; line-height: 25px;">{{detail.content}}</div>
        <div class="pt25 plr25 align_center">
          <div class="plr25 pb25 align_right" v-if="detail.user_voting && detail.user_voting.times">您在
            <span class="cl-red bold">
              {{detail.user_voting && detail.user_voting.times}}
            </span>
            参与了投票</div>
          <Vote2 :data="detail" @value="(e) => detail.option = e" />
          <div class="mt10">
            <div class="bg-ccc cl-white p15 inline" style="border-radius: 4px; width: 100px;" @click="handelclick">我要投票</div>
          </div>
        </div>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
import Vote2 from "@/views/vote/components/vote2.vue"
export default defineComponent({
  name: 'v-Category',
  components: {
    Vote2
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();

    const store = useStore();
    const detail: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'voteDetail',
        data: {
          talk_id: props.data.id
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    function handelclick(param: any) {
      if (detail.value.user_voting.times) {
        proxy.$hlj.message({
          msg: "亲, 你已经投过票了"
        })
        return
      }
      debugger
      store.dispatch('common/Fetch', {
        api: "Vote",
        data: {
          id: detail.value.id,
          options: typeof detail.value.option === 'string' ? detail.value.option : detail.value.option === undefined ? '' : detail.value.option.join(',')
        }
      }).then(res => {
        if(res.ifSuccess === 2){
          return
        }
        param.vote = parseInt(param.vote) + parseInt(res.result.num)
        param.status = true
      })
    }

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail,
      init,
      handelclick
    }
  }
})
</script>
