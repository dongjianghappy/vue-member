<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left">
      <Aside :data="module.home_nav" title="首页" />
    </div>
    <!-- 主内容 -->
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <div class="module-head p20 font22">个人档</div>
        <div class="module-content basic-info">
          <div class="flex">
            <div style="flex: 1">
              <div class="mb25">
                {{userInfo.nickname}}（博客号: {{userInfo.account}}）
                <span class="font12"><i class="iconfont icon-blogger mr5" style="color: #ffa82c;" />{{userInfo.blogger}}</span>
                <div class="mt10 font12">
                  <span class="mr15">博客访问量: {{userInfo.total_visit || 0}}</span>
                  <span class="mr25">今日访问: {{userInfo.today_visit || 0}}</span>
                  <span class="mr15">邮箱状态: 未验证</span>
                </div>
                <div class="mt10 font12">
                  <span class="mr15">内容: {{userInfo.talk}}</span>
                  <span class="mr15">关注: {{userInfo.myconcern}}</span>
                  <span class="mr15">粉丝: {{userInfo.concernmy}}</span>
                  <span class="mr15">获赞: {{userInfo.praise}}</span>
                </div>
              </div>

              <div class="font16 bold">基本信息</div>
              <div style="display: flex">
                <div class="form-wrap-box" style="overflow: hidden;">
                  <ul>
                    <li class="li col-md-6"><span class="label">性别</span>{{userInfo.sex}}</li>
                    <li class="li col-md-6"><span class="label">年龄</span>{{userInfo.age}}</li>
                    <li class="li col-md-6"><span class="label">生日</span>{{userInfo.month}}月{{userInfo.day}}日</li>
                    <li class="li col-md-6"><span class="label">所在地</span>{{address.province}}{{address.city}}{{address.area}}</li>
                    <li class="li col-md-6"><span class="label">星座</span>白羊座</li>
                    <li class="li col-md-6"><span class="label">职业</span>{{userInfo.industry || '-'}}</li>
                    <li class="li col-md-6"><span class="label">兴趣</span>篮球</li>
                  </ul>
                </div>
              </div>

              <div class="mt25 font16 bold">联系方式</div>
              <div class="form-wrap-box" style="overflow: hidden;">
                <ul>
                  <li class="li col-md-6"><span class="label">微信</span>{{userInfo.weixin || 0}}</li>
                  <li class="li col-md-6"><span class="label">QQ号</span>
                    {{userInfo.qq}}
                  </li>
                </ul>
              </div>

              <div class="mt25 font16 bold">活跃概况</div>
              <div class="form-wrap-box" style="overflow: hidden;">
                <ul>
                  <li class="li col-md-6"><span class="label">加入时间</span>{{userInfo.register}}</li>
                  <li class="li col-md-6"><span class="label">最近登录</span>{{userInfo.last_login_time}}</li>
                  <li class="li col-md-6"><span class="label">上次发表时间</span>{{userInfo.last_login_time}}</li>
                  <li class="li col-md-6"><span class="label">所在地区</span>{{address.province}}</li>
                </ul>
              </div>
              <div class="mt25 font16 bold">统计信息</div>
              <div class="form-wrap-box" style="overflow: hidden;">
                <ul>
                  <li class="li col-md-6"><span class="label">积分</span>{{userInfo.integration || 0}}</li>
                  <li class="li col-md-6"><span class="label">金币</span>{{userInfo.goldcoin || 0}}</li>
                </ul>
              </div>

              <div class="mt25 font16 bold">简介</div>
              <div class="mt10">
                {{userInfo.introduction}}
              </div>
            </div>
            <div class="plr15" style="width:300px">
              <div class="pb10 font16 bold">形象照</div>
              <div>
                <img class="radius-4" :src="userInfo.image_photo" style="width: 100%;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useStore,
  onMounted,
  reactive,
  getUid
} from '@/utils'
import citys from '@/assets/cityData'
import UserInfoHead from './components/UserInfoHead.vue'
import Aside from './components/Aside.vue'

const store: any = useStore()
const userInfo: any = ref({});
const module = computed(() => store.getters['user/config_talk']);
const cityData: any = reactive(citys)
const address: any = ref({});

function render() {
  let province = ""
  let city = ""
  let area = ""
  for (var i in cityData) {
    const arr = i.split(',');
    if (arr.length == 1) {
      province = cityData[i][userInfo.value.province]
    }
    if (arr.length == 2 && arr[1] == userInfo.value.province) {
      city = cityData[i][userInfo.value.city]
    }
    if (arr.length == 3 && arr[2] == userInfo.value.city) {
      area = cityData[i][userInfo.value.area]
    }
  }

  return {
    province,
    city,
    area
  }
}

function init() {
  store.dispatch('common/Fetch', {
    api: 'userInformation',
    data: {
      uid: getUid()
    }
  }).then((res: any) => {
    userInfo.value = res.result
    address.value = render();
  })
}

onMounted(() => {
  init()
})
</script>
