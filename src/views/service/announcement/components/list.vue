<template>
  <div class="module-wrap">
    <div class="module-content basic-info" style="height: 560px;">
      <div class="font20 bold">公告通知</div>
      <div class="module-content form-wrap-box font18">
        <ul>
          <li class="li">
            {{detail.title}}
          </li>
          <li class="li">
            {{detail.content}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  useStore,
  onMounted,
  codings,
  useRoute
} from '@/utils'

const store: any = useStore()
const route: any = useRoute()
const detail: any = ref({})
const coding: any = codings.service.announcement

function init() {
  store.dispatch('common/Fetch', {
    api: 'detail',
    data: {
      coding,
      id: route.query.id
    }
  }).then((res: any) => {
    detail.value = res.result
  })
}

onMounted(init)
</script>
