<template>
<div class="pagination-wrap">
  <button class="pagination-button deg180" @click="handelClick(pagination.page - 1)" v-if="pagination.page > 1">
    <i class="iconfont icon-arrow" />
  </button>
  <button class="pagination-button deg180" v-else>
    <i class="iconfont icon-arrow" />
  </button>
  <ul v-if="pagination.pages > 0">
    <li @click="handelClick(1)" v-if="pagination.pages > 5 && pagination.page > 3">1</li>
    <li @click="handelClick(pagination.page-1)" v-if="pagination.pages > 5 && pagination.page > 4 && simple === false">•••</li>
    <template v-for="(item) in (pagination.pages > 5 ? 5 : pagination.pages)" :key="item">
      <li :class="{current: pagination.page == 1}" @click="handelClick(item)" v-if="(item == 1 && pagination.page <= 5 && pagination.pages <= 5) || (item == 1 && pagination.page <= 3 && pagination.pages > 5)">{{item}}</li>
      <li @click="handelClick(item)" v-else-if="pagination.page == 1">{{item}}</li>
      <li :class="{current: pagination.page == item}" @click="handelClick(item)" v-else-if="pagination.page == 2 || pagination.page == 3">{{item}}</li>
      <li :class="{current: pagination.page == (pagination.page - 3 + item)}" @click="handelClick(pagination.page - 3 + item)" v-else-if="pagination.page > 3 && pagination.pages - pagination.page >= 2">{{pagination.page - 3 + item}}</li>
      <li :class="{current: pagination.page == (pagination.page - 4 + item)}" @click="handelClick(pagination.page - 4 + item)" v-else-if="pagination.page > 3 && pagination.pages - pagination.page == 1">{{pagination.page - 4 + item}}</li>
      <template v-else-if="pagination.page > 3 && pagination.page == pagination.pages">
        <li :class="{current: pagination.page == item}" @click="handelClick(item)" v-if="pagination.pages == 4">{{item}}</li>
        <li :class="{current: pagination.page == pagination.page - 5 + item}" @click="handelClick(pagination.page - 5 + item)" v-else>{{pagination.page - 5 + item}}</li>
      </template>
    </template>
    <li @click="handelClick(parseInt(pagination.page) + 1)" v-if="pagination.pages > 5 && pagination.pages - pagination.page > 3 && simple === false">•••</li>
    <li @click="handelClick(pagination.pages)" v-if="pagination.pages > 5 && pagination.pages - pagination.page > 2">{{pagination.pages}}</li>
  </ul>
  <button class="pagination-button" @click="handelClick(parseInt(pagination.page) + 1)" v-if="pagination.page < pagination.pages">
    <i class="iconfont icon-arrow" />
  </button>
  <button class="pagination-button" v-else>
    <i class="iconfont icon-arrow" />
  </button>
  <span v-if="simple === false">
    前往
    <input v-model="currentPage" type="text" class="input-50 align_center" @keyup.enter="handelClick(currentPage)" style="height: 32px;">
    页
  </span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          total: 0,
          page: 1,
          pagesize: 10
        }
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['clickPage'],
  setup(props, context) {
    const store = useStore()
    const currentPage = ""

    function handelClick(param: any) {
      store.commit('common/setPage', param)
      props.pagination.page = param
      props.render({
        page: param
      })
    }

    return {
      currentPage,
      handelClick
    }
  }
})
</script>
