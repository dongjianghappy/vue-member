<template>
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">牌照</span>
        <div class="mt10 flex" style="background: #33343f;">
          <div class="mr25" style="width: 245px">
            <v-upload ref="upload" :dataList="basicInfo.brand_photo" uploadtype="album" @imgList="brandPhoto" maxLength="1" :style="'width: 200px; height: 150px'" />
          </div>
          <div class="pr10" style="flex: 1; padding-top: 145px;">
            <v-visible v-model:visible="basicInfo.visible" />
            <span class="right">
              <Album :submit="handleSave" :data="{file: 'brand_photo'}" />
            </span>
          </div>
        </div>
      </li>
      <li class="li">
        <span class="label">形象照</span>
        <div class="mt10 flex" style="background: #33343f;">
          <div class="mr25" style="width: 245px">
            <v-upload ref="upload" :dataList="basicInfo.image_photo" uploadtype="album" @imgList="imageIhoto" maxLength="1" :style="'width: 200px; height: 150px'" />
          </div>
          <div class="pr10" style="flex: 1; padding-top: 145px;">
            <v-visible v-model:visible="basicInfo.visible" />
            <span class="right">
              <Album :submit="handleSave" :data="{file: 'image_photo'}" />
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore
} from '@/utils'
import Album from './album.vue'
export default defineComponent({
  name: 'AsideView',
  components: {
    Album
  },
  props: {
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    basicInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo: any = ref(props.basicInfo)

    // 监听图片上传
    function brandPhoto(a: any) {
      handleSave({
        name: 'brand_photo',
        img: a
      })
    }

    // 监听图片上传
    function imageIhoto(a: any) {
      handleSave({
        name: 'image_photo',
        img: a
      })
    }

    function handleSave(param: any) {
      store.dispatch('common/Fetch', {
        api: "editUserInfo",
        data: {
          ...param
        }
      }).then((res: any) => {
        props.render()
      })
    }

    onMounted(() => {
      props.render()
    })

    return {
      userInfo,
      brandPhoto,
      imageIhoto,
      handleSave
    }
  }
})
</script>
