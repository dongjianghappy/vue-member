<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-write" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="设置状态" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">

<template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">

        <div class="mb5">书签类型</div>
        <input type="text" v-model="formData.name" placeholder="请输入书签类型" class="input-mid input-full">
      </li>
      <li>
        <div class="mb5">书签描述</div>
        <textarea v-model="formData.description" placeholder="请输入书签描述" class="w-full"></textarea>
      </li>
    </ul>
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
  watch
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    img: {
      type: String,
      defualt: ""
    },
   
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const {
      action,
      item
    } = props.data
    const formData = ref(item || {
      name: "",
      description: "",
    })

    

    // 初始化数据
    function init() {
      console.log("sdsd");

    }

    function submit() {
      const {
        name,
        description
      } = formData.value
      const param: any = {
        name,
        description,
        coding: "U30004",
      }

      if (action !== "add") {
        param.id = item.id
      }

      store.dispatch('common/Fetch', {
        api: action === "add" ? "CreateGroup" : "EditGrouping",
        data: {
          ...param
        }
      }).then(res => {
        props.render()
        context.emit('update:showFlag', false)
      })

    }

    onMounted(init)
    return {
      formData,
      submit,
      isShow
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
