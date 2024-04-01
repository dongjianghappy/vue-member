<template>
  <v-button @click="handleclick">
    {{data.vote ? '投票设置' : '开启或添加投票'}}
  </v-button>
  <v-dialog v-model:show="isShow"
            ref="dialog"
            title="投票设置"
            width="950px"
            :style="{width: 650, height: 600}"
            @submit="submit">
    <template v-slot:content
              v-if="isShow">
      <div style="padding: 25px; height: 450px; overflow: auto;">
        <div class="form-wrap-box">
          <div class="li mb15">
            <span class="label">投票开关</span>
            <v-switch :data="{ item: detail, field: 'status'}"
                      api="userSettinng"
                      @toggle="getValue"
                      className="right"
                      :auth="true" />
          </div>
          <div class="li">
            <span class="label">投票名称</span>
            <input v-model="detail.name"
                   type="text"
                   placeholder="请输入投票名称"
                   class="input-sm input-full" />
          </div>
          <div class="li">
            <span class="label">截止时间</span>
            <input v-model="detail.start_time"
                   type="text"
                   placeholder="开始时间"
                   class="input-sm input-150" />
            至
            <input v-model="detail.last_time"
                   type="text"
                   placeholder="结束时间"
                   class="input-sm input-150" />
          </div>
          <div class="li">
            <span class="label">投票对象</span>
            <v-radio label="所有人都可参与"
                     name="grade"
                     value="1"
                     v-model:checked="detail.grade" />
            <v-radio label="仅关注我的人可参与"
                     name="grade"
                     value="0"
                     v-model:checked="detail.grade" />
          </div>
          <div class="li">
            <span class="label">投票说明</span>
            <textarea placeholder="请输入投票说明"
                      v-model="detail.content"
                      class="w-full"></textarea>
          </div>
        </div>
        <h2 class="mt30 font18">选项管理</h2>
        <div class="form-wrap-box">
          <div class="li">
            <span class="label">标题</span>
            <input v-model="detail.votetitle"
                   type="text"
                   placeholder="请输入标题"
                   class="input-sm input-full" />
          </div>
          <div class="li">
            <span class="label">投票种类</span>
            <v-radio label="单投"
                     name="choose"
                     value="1"
                     v-model:checked="detail.choose" />
            <v-radio label="多投"
                     name="choose"
                     value="0"
                     v-model:checked="detail.choose" />
          </div>
          <div class="li">
            <span class="label">图表类型</span>
            <v-radio label="条形图"
                     name="chart"
                     value="1"
                     v-model:checked="detail.chart" />
            <v-radio label="柱状图"
                     name="chart"
                     value="0"
                     v-model:checked="detail.chart" />
          </div>
          <div class="li"
               style="background: var(--w-input-div-background);">
            <span>选项列表</span>
            <span class="ml25"
                  @click="clickAdd"><i class="iconfont icon-anonymous-iconfont"
                 style="font-size: 18px !important"></i></span>
          </div>
          <div class="li"
               style="background: var(--w-input-div-background); height: auto !important;">
            <span class="label"></span>
            <div class="mb5 clearfix"
                 v-for="(item, index) in dataList"
                 :key="index">
              <div class="col-md-1"
                   style="line-height: 38px;">选项{{index+1}}</div>
              <div class="col-md-11">
                <div style="display: flex;">
                  <div class="mr5 relative"
                       style=" width: 50px; height: 40px;">
                    <v-colorpicker @color="(e) => item.color = e.value"
                                   :color="item.color"
                                   attr="fill" />
                  </div>
                  <div style="flex: 1">
                    <input placeholder="请输入选项名称"
                           type="text"
                           class="ant-input"
                           v-model="item.votetitle"
                           style="width: 30%; height: 40px;">
                    <input placeholder="请输入选项描述"
                           type="text"
                           class="ant-input"
                           v-model="item.description"
                           style="width: 55%; height: 40px;">
                    <span style="margin-left: 10px;">
                      <i class="iconfont icon-recycle"
                         @click="clickRemove(index)"></i>
                    </span>
                  </div>
                </div>
              </div>
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
  onMounted,
  ref,
  useStore,
  watch
} from '@/utils'
export default defineComponent({
  name: 'v-Category',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "talk"
    }
  },
  setup(props, context) {
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
        api: 'getVote',
        data: {
          talk_id: props.data.id
        }
      }).then(res => {
        detail.value = res.result
        dataList.value = res.result.list
      })
    }

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function clickAdd() {
      dataList.value.push({
        image: '',
        sort: '',
        static: '',
        status: '',
        vote: '',
        votetitle: '',
        description: ''
      })
    }

    // 确认按钮
    function submit(params: any) {
      const {
        id,
        name,
        talk_id,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
        chart,
        status
      } = detail.value

      let listData: any = []
      dataList.value.map((item: any) => {
        listData.push({
          id: item.id,
          votetitle: item.votetitle,
          color: item.color,
          description: item.description
        })
      })

      const param: any = {
        name,
        talk_id: props.data.id,
        type: props.type,
        start_time,
        last_time,
        grade,
        content,
        votetitle,
        choose,
        chart,
        status,
        list: JSON.stringify(listData)
      }
      if (0) {
        param.id = id
      }
      store.dispatch('common/Fetch', {
        api: "setVote",
        data: {
          ...param
        }
      }).then(res => {
        isShow.value = false
      })
    }

    function clickRemove(index: any) {
      dataList.value.splice(index, 1)
    }

    return {
      dialog,
      isShow,
      current,
      handleclick,
      clickAdd,
      clickRemove,
      dataList,
      detail,
      submit
    }
  }
})
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
