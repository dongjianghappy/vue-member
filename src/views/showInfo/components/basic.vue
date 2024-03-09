<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">基本信息</span>
      <div class="line"></div>
    </div>
    <ul class="info">
      <li>
        <label>用户名</label>
        <div>{{basicInfo.username}} ID {{basicInfo.account}}</div>
      </li>
      <li>
        <label>昵称</label>
        <div class="con" v-if="isEdit">{{basicInfo.nickname}}</div>
        <input type="text" v-model="userInfo.nickname" class="input-sm" v-else>
      </li>
      <li>
        <label>签名</label>
        <div class="con" v-if="isEdit">{{basicInfo.signature}}</div>
        <input type="text" v-model="userInfo.signature" class="input-sm" v-else>
      </li>
      <li>
        <label>真实姓名</label>
        <div class="con" v-if="isEdit">{{basicInfo.realname}}</div>
        <input type="text" v-model="userInfo.realname" class="input-sm" v-else>
      </li>
      <li>
        <label>姓别</label>
        <div class="con" v-if="isEdit">{{basicInfo.sex === "1" ? "男" : "女"}}</div>
        <span v-else>
          <input name="sex" type="radio" value="1" class="sex" v-model="userInfo.sex"> 男&nbsp;&nbsp;
          <input name="sex" type="radio" value="0" class="sex" v-model="userInfo.sex"> 女
        </span>
      </li>

      <li>
        <label>生日</label>
        <div class="con" v-if="isEdit"><span id="year">{{basicInfo.year}}</span>年 <span id="month">{{basicInfo.month}}</span>月 <span id="day">{{basicInfo.day}}</span>日</div>
        <v-birthday :data="{year: basicInfo.year, month: basicInfo.month, day: basicInfo.day}" @choose="chooseBirthday" v-else />

      </li>

      <li>
        <label>所在地</label>
        <div class="con" v-if="isEdit">
          <span id="province">{{address.province}}</span>
          <span id="city">{{address.city}}</span>
          <span id="area">{{address.area}}</span>
        </div>
        <v-citylist :data="{province: basicInfo.province, city: basicInfo.city, area: basicInfo.area}" @choose="chooseArea" v-else />

      </li>
      <li><label>血型</label>
        <div class="con" v-if="isEdit">{{basicInfo.bloodtype}} 型</div>
        <span class="selectgroup" v-else>
          <select v-model="userInfo.bloodtype" class="">
            <option value="A">A型</option>
            <option value="B">B型</option>
            <option value="AB">AB型</option>
            <option value="O">O型</option>
          </select>
        </span>
      </li>
      <li style="height: auto"><label>简介</label>
        <div class="con" v-if="isEdit">{{basicInfo.introduction}}</div>
        <textarea v-model="userInfo.introduction" v-else></textarea>
      </li>
      <li style="height: auto"><label>留言寄语</label>
        <div class="con" v-if="isEdit">{{basicInfo.message}}</div>
        <textarea v-model="userInfo.message" v-else></textarea>
      </li>
    </ul>
  </div>

</div>
<!-- 联系信息 -->
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">联系信息</span>
      <div class="line"></div>
    </div>
    <ul class="info">
      <li>
        <label>邮箱</label>
        <div class="con" v-if="isEdit">{{basicInfo.email}}</div>
        <input type="text" v-model="userInfo.email" class="input-sm" v-else>
      </li>
      <li>
        <label>电话</label>
        <div class="con" v-if="isEdit">{{basicInfo.phone}}</div>
        <input type="text" v-model="userInfo.phone" class="input-sm" v-else>
      </li>
      <li>
        <label>QQ</label>
        <div class="con" v-if="isEdit">{{basicInfo.qq}}</div>
        <input type="text" v-model="userInfo.qq" class="input-sm" v-else>
      </li>
      <li>
        <label>微信</label>
        <div class="con" v-if="isEdit">{{basicInfo.weixin}}</div>
        <input type="text" v-model="userInfo.weixin" class="input-sm" v-else>
      </li>
    </ul>
  </div>

</div>
<!-- 博客信息 -->
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">博客信息</span>
      <div class="line"></div>
    </div>
    <ul class="info">
      <li>
        <label>标签</label>
        <div class="con" v-if="isEdit">{{basicInfo.blog_tag}}</div>
        <textarea v-model="userInfo.blog_tag" class="" v-else></textarea>
      </li>
      <li>
        <label>描述</label>
        <div class="con" v-if="isEdit">{{basicInfo.blog_desc}}</div>
        <textarea v-model="userInfo.blog_desc" class="" v-else></textarea>
      </li>
    </ul>
  </div>

</div>
<!-- 只有信息 -->
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">职业信息</span>
      <div class="line"></div>
    </div>
    <ul class="info">
      <li>
        <label for="username">职业</label>
        <div class="con" v-if="isEdit">{{basicInfo.industry}}</div>
        <textarea v-model="userInfo.industry" class="" v-else></textarea>
      </li>
    </ul>
  </div>
</div>
<!-- 教育信息 -->
<div class="module-wrap m0">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module" :class="{'cancel-module': !isEdit}">
      <span class="name">教育信息</span>
      <div class="line"></div>

    </div>
    <ul class="info">
      <li>
        <label for="username"></label>
        <div class="con" v-if="isEdit">{{basicInfo.education}}</div>
        <textarea v-model="userInfo.education" class="" v-else></textarea>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed
} from 'vue'
import citys from '@/assets/cityData'

export default defineComponent({
  name: 'AsideView',
  props: {
    basicInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:basicInfo'],
  setup(props, context) {
    let isEdit = ref(true)
    const cityData: any = reactive(citys)
    const userInfo: any = ref(props.basicInfo)

    const address = computed(() => render());

    function render() {
      let province = ""
      let city = ""
      let area = ""
      for (var i in cityData) {
        const arr = i.split(',');
        if (arr.length == 1) {
          province = cityData[i][props.basicInfo.province]
        }
        if (arr.length == 2 && arr[1] == props.basicInfo.province) {
          city = cityData[i][props.basicInfo.city]
        }
        if (arr.length == 3 && arr[2] == props.basicInfo.city) {
          area = cityData[i][props.basicInfo.area]
        }
      }

      return {
        province,
        city,
        area
      }
    }

    return {
      isEdit,
      userInfo,
      address
    }
  }

})
</script>
