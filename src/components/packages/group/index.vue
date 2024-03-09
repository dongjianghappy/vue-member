<template>
<v-button v-model:show="isShow">
  <span style="color: var(--color-primary)">管理</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="自定义分组" :style="{width: 650, height: 450}" :hasfooter="false">
  <template v-slot:content>
    <Group v-model:group="group" @submit="submit" :coding="coding" :render="render" />
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
import Group from './components/group.vue'
export default defineComponent({
  name: 'HomeViewh',
  components: {
    Group
  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
      type: String,
      default: ""
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

    function submit(param: any) {
      const {
        action,
        data
      } = param

      if (action === 'move') {
        let form: any = []
        props.group.map((item: any, index: any) => {
          item.sort = 1 + index
          form.push({
            id: item.id,
            sort: item.sort,
          })
        })
        store.dispatch('common/Fetch', {
          api: 'updateSave',
          data: {
            coding: props.coding,
            data: JSON.stringify(form),
          }
        })
      } else {
        const params: any = {
          id: data.id,
          name: data.name,
          description: data.description,
          coding: props.coding,
        }
        store.dispatch('common/Fetch', {
          api: 'delete',
          data: {
            ...params
          }
        }).then(res => {
          param.cancel()
          props.render()
          context.emit('update:showFlag', false)
        })
      }
    }

    return {
      isShow,
      submit
    }
  }
})
</script>
