<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'add' : 'edit'}`" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="设置状态" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <ul class="edit-list">
      <li class="mb15">
        <div class="mb5">分类名称</div>
        <input type="text" v-model="formData.name" class="input-mid input-full">
      </li>
      <li>
        <div class="mb5">分类描述</div>
        <input type="text" v-model="formData.description" class="input-mid input-full">
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
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
        coding: "U20001",
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
      isShow,
      formData,
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
