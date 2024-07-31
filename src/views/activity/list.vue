<template>
<div>
  <div class="container w1100 relative clearfix">
    <div class="w180 left">
      <v-aside :data="[]" :isFixed="true" title="话题">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <div class="module-content p20" style="min-height: 500px">
          <div class="mb15 font14">
            <span class="right">
              <Detail :data="{coding: coding.activity}" :render="init" v-if="userInfo.account && module.create" />
            </span>
          </div>
          <div class="clearfix">
            <div class="col-md-3 p10" v-for="(item, index) in dataList.list" :key="index">
              <div class="thumbnail p10 relative radius-4" style="background: var(--card-background);" @click="show(item.name)">
                <div class="radius-4" style="overflow: hidden;">
                  <img :src="item.image" class="img-scale" style="width: 100%; height: 160px;">
                </div>
                <div class="caption relative" style="padding: 10px 0px; height: 40px;">
                  <span>#{{item.name}}#
                    <span class="mark vote" v-if="item.vote !=='0'">票</span>
                  </span>
                </div>
                <div class="relative" style="border-top: 1px dotted var(--default-border); padding: 10px 0px; height: 40px;"> {{item.num}} 人次参与</div>
              </div>
            </div>
          </div>
          <div class="mt25 align_center" v-if="dataList.total > 10">
            <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  useStore,
  useRouter,
  useRoute,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();
const coding = codings.talk
const component = computed(() => route.query.mod);
const dataList = computed(() => store.getters['common/activityList']);
const module = computed(() => store.getters['user/config_talk'].activity || []);
const userInfo = computed(() => store.getters['user/loginuser']);

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 16
  }

  Object.assign(params, param)
  store.dispatch('common/ActivityList', {
    data: {
      ...params
    }
  })
}

function show(name: any) {
  router.push(`/activity?item=${name}`)
}
onMounted(init)
</script>
