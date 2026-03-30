<template>
    <div style=" overflow: auto;">
      <div class="mb5 p15" style="background: var(--card-background);" v-for="(item, index) in data.list" :key="index">
                        <div class="flex">
                            <div style="width: 120px">
                                {{item.name}}
                            </div>
                            <div style="width: 200px">
                                {{item.date}} {{item.time}}:00 约{{item.time_specification}}
                            </div>
                            <div style="width: 120px">
                                {{item.address}}
                            </div>
                            <div class="font14 align_right" style="flex: 1">
                                    <Detail3 action="edit" :data="{id: item.id,coding: data.coding}" :render="render" />
                            </div>
                        </div>
                        <div class="flex mt10">
                          <div style="flex: 1">{{item.content}}</div>
                        <div class="flex"  style="flex: 1">
                            <div style="flex: 1">
                                <div class="right align_center" style="width: 100px;" v-for="(list, i) in item.image" :key="i">
                                    <img :src="list" onerror="this.src='/images/head_normal_100.png'" class="photos p5" style="width: 100px; height: 100px; border-radius: 8px;">
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
    </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
import Detail3 from './detail3.vue'
const props: any = defineProps({
  action: {
    type: String,
    default: 'add'
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  type: {
    type: String,
    default: "talk"
  },
    render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const isShow: any = ref(false)
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const element: any = document.getElementsByTagName('html');
const dialog: any = ref(null)
const dataList: any = ref([])
const detail: any = ref({})
let current: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    element[0].style.overflow = 'hidden';
    init()
  } else {
    element[0].style.overflow = 'auto';
  }
})

function init(param: any = "") {
  store.dispatch('common/Fetch', {
    api: 'closeFriendContentDetail',
    data: {
      id: props.data.id
    }
  }).then(res => {
    dataList.value = res.result
  })
}

function handleclick(param: any) {
  isShow.value = !isShow.value
}

</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 4px;
  /* 设置滚动条的宽度 */
  background-color: #222;
  /* 设置滚动条的背景颜色 */
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
  background-color: #45494e;
  /* 设置滚动条滑块的颜色 */
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  /* 为滚动条轨道添加阴影效果 */
}

.form-wrap-box {
  overflow: hidden;

  ul {
    padding: 0;

    li {
      box-sizing: initial;

      :hover {
        background: none !important;
      }
    }
  }
}
</style>
