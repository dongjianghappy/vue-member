<template>
<v-dialog :title="config.title" width="650px" height="350px" :confirm="true" :cancel="true" @submit="submit" v-model:isShow="isShow">
  <template v-slot:content>
    <div class="ant-modal-body">
      <div style="padding: 10px;">当前：{{currentValue.name || config.name}}</div>
      <div class="cate-wrap">
        <div>
          <div style="padding: 10px 0px;">
            <div style="position: relative;">
              <template v-for="(item, index) in data" :key="index">
                <div style="padding: 6px 0px;"><span :class="{current: currentValue.value ===  `|${item.id}|`}" @click="choose({value: `|${item.id}|`, name:  `${item.name}`})" style="padding: 6px 10px;">{{item.name}}</span></div>
                <div style="display: flex; flex-wrap: wrap;">
                  <div v-for="(list, i) in item.list" :class="{current: currentValue.value ===  `|${item.id}|${list.id}|`}" :key="i" style="padding: 6px 10px;" @click="choose({value: `|${item.id}|${list.id}|`, name:  `${item.name} > ${list.name}`})">{{list.name}}</div>

                </div>
              </template>
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
  reactive,
  ref,
  watch,
  toRefs
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    config: {
      type: Object,
      defualt: () => {
        return
      }
    },
    showFlag: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      summary: "",
    }
  },
  emits: ['submit', 'getValue', 'update:showFlag'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(props.showFlag)
    const data = ref([])
    const {
      coding,
      api
    }: any = props.config
    const currentValue: any = ref(props.config)

    // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      context.emit('update:showFlag', false)
    })

    // 初始化数据
    function init() {
      store.dispatch('common/Fetch', {
        api,
        data: {
          coding
        }
      }).then(res => {
        data.value = res.result
      })
    }

    // 选择
    function choose(param: any) {
      currentValue.value.value = param.value
      currentValue.value.name = param.name
    }

    // 确认
    function submit() {
      isShow.value = false
      context.emit('getValue', currentValue.value)
    }

    onMounted(init)
    return {
      isShow,
      data,
      currentValue,
      choose,
      submit
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>
