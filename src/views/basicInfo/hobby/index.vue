<template>
<div class="module-wrap">
  <div class="module-content basic-info">
    <div class="info-module">
      <span class="name">兴趣爱好</span>
      <div class="line"></div>
      <span data-coding="" class="update-info editbtn" @click="Edit">{{isEdit ? "保存" : "编辑"}}</span>
    </div>
    <ul class="info">
      <li class="mb5">
        <label>明星</label>
        <TagList v-model:tags='hobby.star' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>音乐</label>
        <TagList v-model:tags='hobby.music' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>影视</label>
        <TagList v-model:tags='hobby.television' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>运动</label>
        <TagList v-model:tags='hobby.sports' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>游戏</label>
        <TagList v-model:tags='hobby.game' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>数码</label>
        <TagList v-model:tags='hobby.digital' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>美食</label>
        <TagList v-model:tags='hobby.food' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>旅游</label>
        <TagList v-model:tags='hobby.tourism' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>书籍</label>
        <TagList v-model:tags='hobby.books' placeholder="请输入" :isEdit="isEdit" />
      </li>
      <li class="mb5">
        <label>其他</label>
        <TagList v-model:tags='hobby.other' placeholder="请输入" :isEdit="isEdit" />
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
  reactive,
  ref,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import TagList from '@/components/tag/index.vue'

export default defineComponent({
  name: 'AsideView',
  components: {
    TagList
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    edit: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['update:user'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    let isEdit = ref(false)
    const userInfo: any = ref(props.user)
    const hobby = computed(() => store.getters['user/hobby']);

    function init() {
      store.dispatch('user/UserHobby', {})
    }

    function Edit() {
      isEdit.value = !isEdit.value

      if (!isEdit.value) {
        debugger
        const data: any = {}
        for (let key in hobby.value) {
          if (hobby.value[key].length > 0) {
            data[key] = `|${hobby.value[key].join("|")}|`
          } else {
            data[key] = ""
          }
        }

        store.dispatch('common/Fetch', {
          api: "EdituserHobby",
          data: {
            ...data
          }
        }).then(res => {
          console.log("ss");
        })
      }
    }

    onMounted(init)
    return {
      isEdit,
      Edit,
      userInfo,
      hobby
    }
  }
})
</script>
