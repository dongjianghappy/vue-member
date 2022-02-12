<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="height: 485px;">
      <div class="info-module">
        <span class="name">兴趣爱好</span>
        <div class="line"></div>
      </div>
      <ul class="info">
        <li>
          <label>明星</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="star"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>音乐</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="music"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>影视</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="television"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>运动</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="sports"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>游戏</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="game"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>数码</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="digital"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>美食</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="food"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>旅游</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="tourism"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>书籍</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="books"
                 value=""
                 class="input-sm input-500">
        </li>
        <li>
          <label>其他</label>
          <div class="con"
               style="height:30px;"></div>
          <input type="text"
                 field="other"
                 value=""
                 class="input-sm input-500">
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
