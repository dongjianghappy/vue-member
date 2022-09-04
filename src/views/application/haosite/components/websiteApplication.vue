<template>
<v-button v-if="type !== 'text'" @click="handleclick">申请</v-button>
<span v-else @click="handleclick" v-html="name" class="cursor"></span>
<v-dialog v-model:show="isShow" ref="form" title="" width="600px" height="680px" conheight="650px" :hasfooter="false" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box" style="height: 570px;">
      <li class="vertical">
        <div class="label">网站名称</div>
        <div style="display: flex">
          <div class="pr5" style="flex: 1">
            <input type="text" v-model="detail.title" class="input-sm w-full" placeholder="请输入问题名称">
          </div>
          <div style="width: 150px">
            <v-select :enums="[
  {
    value: 'solid',
    name: '实线',
  },
  {
    value: 'dotted',
    name: '点线',
  },
  {
    value: 'dashed',
    name: '虚线',
  }]" />
          </div>
        </div>
      </li>
      <li class="vertical">
        <div class="label">网站地址</div>
        <div><input type="text" class="input-sm w-full" placeholder="请输入问题名称"></div>
      </li>
      <li class="vertical">
        <div class="label">网站标签</div>
        <v-tag v-model:tags="detail.tag" />
      </li>
      <li class="vertical">
        <div class="label">网站简介</div>
        <div>
          <textarea class="input-textarea w-full" v-model="summary" placeholder="请输入问题详情信息"></textarea>
        </div>
      </li>
      <li class="vertical">
        <div class="label">附件上传</div>
        <Upload ref="upload" @website="image" :emitName="website" :show="true" />
      </li>

    </ul>

    <div class="mt10">
      <button @click="save" class="btn btn-default cl-white" style="background: #ffc09f; border-radius: 4px;">提交申请</button>
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
import Upload from "@/components/public/Upload.vue"
export default defineComponent({
  name: 'v-Category',
  components: {
    Upload
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    isInt: {
      type: Boolean,
      default: false
    },
    // 是否更新
    isUpdate: {
      type: Boolean,
      default: false
    },
    operating: {
      type: String,
      default: ""
    },
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const upload: any = ref(null);
    const detail: any = {
      title: "",
      url: "",
      img: "",
      tag: "",
      summary: ""
    }

    const store = useStore();
    const dataList: any = ref([])
    let current: any = ref({})

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function choose(param: any) {
      current.value = param
    }

    // 监听图片上传
    function image(a: any) {
      detail.img = a
    }

    // 保存
    function save() {
      const {
        fid,
        title,
        url,
        img,
        tag,
        summary
      } = detail

      const param: any = {
        fid,
        title,
        url,
        img,
        tag,
        summary,
        coding: "K20000",
      }
      proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: "InsertArticle",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    return {
      isShow,
      current,
      detail,
      handleclick,
      choose,
      dataList,
      upload,
      image,
      save
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

.ps {
  height: 580px;
}
</style>
