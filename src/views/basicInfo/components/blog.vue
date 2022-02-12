<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="padding-bottom: 25px !important;">

      <div class="info-module">
        <span class="name">博客信息</span>
        <div class="line"></div>
        <span data-coding="U0015"
              class="update-info editbtn">编辑</span>
      </div>
      <ul class="info">
        <li>
          <label>昵称</label>
          <div class="con">美丽的星空</div>
          <input type="text"
                 field="nickname"
                 value="美丽的星空"
                 class="input-sm">
        </li>
        <li>
          <label>标签</label>
          <div class="con"></div>
          <input type="text"
                 field="tag"
                 value=""
                 class="input-sm">
        </li>
        <li>
          <label>描述</label>
          <div class="con">点滴生活，记录每一天</div>
          <textarea field="description">点滴生活，记录每一天</textarea>
        </li>
      </ul>
    </div>

    <div class="module-content basic-info"
         style="padding-bottom: 25px !important;">
      <div class="info-module">
        <span class="name">风格设置</span>
        <div class="line"></div>
        <span data-coding="U0015"
              class="update-info editbtn">编辑</span>
      </div>
      <ul class="info">
        <!--            <li>
                <label>主题</label>
                <div class="con">2</div>
                <input type="text" field="theme" value="2" class="input-sm">
            </li>	-->
        <li>
          <label>头像背景</label>
          <div class="con">#f1f0ee</div>
          <input type="text"
                 field="head_bg"
                 value="#f1f0ee"
                 class="input-sm">
        </li>

        <li>
          <label>内容背景</label>
          <div class="con">#f1f0ee</div>
          <input type="text"
                 field="main_bg"
                 value="#f1f0ee"
                 class="input-sm">
        </li>

      </ul>
    </div>

    <div class="module-content basic-info"
         style="padding-bottom: 25px !important;">
      <div class="info-module">
        <span data-coding="U0015"
              class="name">音乐设置</span>
        <div class="line"></div>
        <span class="update-info editbtn"
              data-coding="1111">编辑</span>
      </div>
      <ul class="info">
        <li>
          <label>背景音乐</label>
          <div class="con"></div>
          <input type="text"
                 field="music"
                 value=""
                 class="input-sm">
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsideView',
  
})
</script>
