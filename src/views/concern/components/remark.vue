<template>
<v-button v-model:show="isShow">
  设置备注
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" action="edit" title="设置备注" :style="{width: 550, height: 630}" api="concernRemark" :data="{...data, coding: coding}" @submit="submit" >
  <template v-slot:content>
    <ul class="form-wrap-box">
      <li class="vertical">
        <div class="label">备注</div>
        <input v-model="detail.remark" type="text" placeholder="请输入备注" class="input-sm input-full" />
      </li>
      <li class="vertical">
        <div class="label">标签</div>
        <input v-model="detail.tag" type="text" placeholder="请输入标签" class="input-sm input-full" />
      </li>
      <li class="vertical">
        <div class="label">电话</div>
        <input v-model="detail.tel" type="text" placeholder="请输入电话" class="input-sm input-full" />
      </li>
      <li class="vertical">
        <div class="label">描述</div>
        <textarea placeholder="请输入描述" v-model="detail.description" class="w-full"></textarea>
      </li>
      <li class="vertical">
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: 'ddd'}" :dataList="detail.img || []" uploadtype="album" @imgList="image" :style="'width: 135px'" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'Remark',
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
    const dialog: any = ref(null)
    const coding: any = codings.user.concern
    const isShow = ref(false)
    const detail: any = ref({})
    const upload: any = ref(null);
    const img = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        debugger
        detail.value = await dialog.value.init()
      }
    })

    // 设置图片
    function image(a: any) {
      img.value = a
    }    

    function submit(param: any) {
      const {remark, tag, tel, description} = detail.value
      store.dispatch('common/Fetch', {
        api: 'updateConcernRemark',
        data: {
          friend_uid: props.data.uid,
          remark,
          tag,
          tel,
          description,
          img: img.value,
        }
      }).then(() => {
        isShow.value = false
      })   
      
    }

    return {
      dialog,
      isShow,
      coding,
      submit,
      detail,
      upload,
      image,
      img
    }
  }
})
</script>
