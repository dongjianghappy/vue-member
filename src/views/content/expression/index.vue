<template>
<div class="module-wrap">

  <div class="module-content content-wrap p20" style="min-height: 560px">
    <div class="mb15">
      表情收藏
      <span class="right pointer" @click="handleSave('add')" v-if="img">
        <i class="iconfont icon-mail" />
        保存
      </span>
      <span class="right pointer mr25" @click="upload.handleclick()">
        <i class="iconfont icon-upload-file" />
        上传
      </span>
    </div>
    <div style="overflow: auto;">
      <v-upload ref="upload" uploadtype='comment' @imgList="image" file="talk" />
    </div>
    <div class="row clearfix">
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList" :key="index">
        <div class="thumbnail p10 relative radius-4" style="background: var(--card-background); height: 230px; overflow: hidden;">
          <div class="relative" style="height: 180px; overflow: hidden;">

            <img :src="item.image" style="width: 100%;" onerror="this.src='http://yunxi10.com/source/public/images/noimage.png'" class="radius-4" />
          </div>
          <div class="flex ptb10
                 " style="height:50px;">
            <div class="nowrap" style="flex: 1">
              {{item.name || '未命名'}}
              <Detail :data="item" action="edit" :render="init" />
            </div>
            <div class="align_right" style="width: 50px">
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  codings,
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  setting,
  information,
} from '@/assets/const'
import {
  useRouter,
  useRoute
} from 'vue-router'
import Detail from './detail.vue'
export default defineComponent({
  name: 'IndexView1',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const coding = codings.user.expression
    const route = useRoute();
    const menu: any = setting
    const dataList: any = ref([])
    const upload: any = ref(null);
    const img = ref("")

    menu.map((item: any) => {
      item.path = `/setting?mod=${item.url}`
    })
    const component = computed(() => route.query.mod);

    function init() {
      store.dispatch('common/Fetch', {
        api: "userExpression"
      }).then(res => {
        dataList.value = res.result
      })
    }

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function handleSave(param: any) {
      store.dispatch('common/Fetch', {
        api: "insertExpression",
        data: {
          img: img.value,
        }
      }).then(res => {
        init()
        img.value = ""
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      component,
      menu,
      upload,
      image,
      img,
      init,
      handleSave
    }
  }
})
</script>
