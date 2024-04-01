<template>
  <TalkTabs ref="talktabs"
            :data="module.question_Tabs"
            :render="init" />
  <div class="module-wrap"
       style=" min-height:630px">
    <div class="module-content p0">
      <div class="questions-list p25"
           v-for="(item, index) in dataList.list"
           :key="index">
        <div class="font16"
             @click="handleClick(item)">{{item.title}}</div>
        <div class="pt10">
          <span class="mr15 cl-ccc">{{item.parent || '未分类'}}</span>
          <span class="mr15 cl-ccc">回答：{{item.answer_num}}</span>
          <span class="mr15 cl-ccc">浏览：{{item.visit || 0}}</span>
          <span class="cl-ccc">{{item.times}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  ref,
  codings,
  useRoute,
  useRouter,
  computed
} from '@/utils'
import TalkTabs from './TalkTabs.vue'

export default defineComponent({
  name: 'v-Button',
  components: {
    TalkTabs
  },
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    buttonType: {
      type: String,
      default: "text"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const store = useStore();
    const route: any = useRoute()
    const router: any = useRouter()
    const coding = codings.questions

    const module = computed(() => {
      const sidebar = store.getters['user/config']['questions']
      sidebar.question_Tabs && sidebar.question_Tabs.map((item: any) => {
        item.path = `/questions?item=${item.value}`
      })
      return sidebar
    });
    const dataList = computed(() => store.getters['talk/questionsList']);

    function init(param: any = {}) {
      let params: any = {
        coding: coding.art,
        page: 1,
        pagesize: 20
      }
      
       Object.assign(params, param)

      store.dispatch('talk/questions', {
        data: {
          ...params
        }
      })
    }

    function handleClick(parm: any) {
      router.push(`/question?id=${parm.id}`)
    }

    onMounted(init)
    return {
      module,
      init,
      dataList,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.questions-list {
  padding: 25px 15px;
  height: 100px;
  font-size: 14px;

  .help {
    background: #b8c5d4;
    width: 60px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center
  }

  .answer {
    background: #d00000;
    width: 60px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center
  }

  .browse {
    background: #f1f1f1;
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .con-wrap {
    position: relative;
    padding: 0px 15px 0 15px;
    padding-left: 80px;
    min-height: 50px;

    .photos {
      position: absolute;
      top: 0;
      left: 15px;
      width: 50px;
      height: 50px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .wb_info {
      padding-bottom: 10px;
      color: #808080;

      .username {
        color: #666;
        font-weight: bold;
      }
    }

    .cat {
      color: #fc9700;
    }
  }

  &:hover {
    background: var(--link-hover-background);
  }
}
</style>
