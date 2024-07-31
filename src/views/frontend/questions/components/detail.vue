<template>
<div class="container w1100 mb20 clearfix">
  <div class="left" style="width: 805px; min-height:350px; border-radius: 4px;">
    <div class="module-wrap" style=" min-height:630px">
      <div class="module-head">
        <span class="font16" @click="handleBack">
          <i class="iconfont icon-back" />
        </span>
      </div>
      <div class="module-content p25">

        <div class="con-list" style="box-shadow: none;">
          <div class="con-wrap">
            <div class="photos">
              <v-photo :data="detail" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === detail.uid" />
              <v-photos :sourceData="detail" v-else />
            </div>
            <div class="user_info pb5"><span class="username">{{detail.nickname}}</span></div>
            <div class="user_from pb5">{{detail.times}} 提问 {{detail.parent}}
            </div>
            <div class="user_text">
              <h2 class="font24" style="padding:15px 0;font-weight: normal;">{{detail.title}}</h2>
              <div class="label">{{detail.label}}</div>

              <div class="mb25" v-if="detail.image && detail.image.length > 0">
                <p class="font16" style="padding:15px 0; font-weight:bold;">图片说明</p>
                <ul class="img-grid smallimg-wrap clearfix" style="width: 362px">
                  <li v-for="(item, index) in detail.image" :key="index">
                    <img :src="item" />
                  </li>

                </ul>
              </div>
              <div>
                <p class="font16" style="padding:15px 0; font-weight:bold;">问题描述</p>
                <div style="line-height: 30px;">{{detail.summary}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="p15 font24 bb" style=" margin-bottom:10px;">
          <span class="answer-num">{{(answerList.list && answerList.list.length) || 0}}</span>个回答
        </div>
        <div class="answer-wrap">
          <div class="font14" v-for="(item, index) in answerList.list" :key="index" style=" position:relative; padding: 5px 0 5px 75px; min-height:100px;">
            <div style=" background:#f9f9f9; position:absolute; left:15px; width:50px; height:50px; line-height:50px; text-align:center" data-id="{$sm_answer[l].id}" data-coding="T10000" class="helped">
              <span><i class="iconfont icon-like font18"></i><span class="num">{{item.help}}</span></span>
            </div>

            <div class="con-list" style="background: #f9f9f9; box-shadow: none;">
              <div class="con-wrap" style="padding-left:60px;">
                <div class="photos">
                  <v-photos :sourceData="item" />
                </div>
                <div class="user_info"><span class="username">{{item.nickname}}</span></div>
                <div class="user_from pb5">{{item.times}} 回答</div>
                <div class="user_text">
                  {{item.content}}
                </div>
              </div>
            </div>

          </div>
        </div>
        <WriteAnswer :data="{id: route.query.id}" :render="answer" />
      </div>
    </div>
  </div>

  <div class="w280 right">
    <Aside />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  useRouter,
  useStore,
  ref,
  computed,
  useRoute,
  codings
} from '@/utils'
import Aside from './recommend.vue'
import WriteAnswer from './write_answer.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const coding = codings.questions
const detail: any = ref({})
const loginuser = computed(() => store.getters['user/loginuser']);
const answerList: any = ref([])

// 初始化数据
function init() {
  store.dispatch('common/Fetch', {
    api: 'ArticleView',
    data: {
      coding: coding.art,
      id: route.query.id
    }
  }).then(res => {
    detail.value = res.result
  })
}

function answer() {
  store.dispatch('common/Fetch', {
    api: 'answerList',
    data: {
      artid: route.query.id
    }
  }).then(res => {
    answerList.value = res.result
  })
}

function handleBack() {
  router.push(`question`)
}

onMounted(() => {
  init()
  answer()
})
</script>
