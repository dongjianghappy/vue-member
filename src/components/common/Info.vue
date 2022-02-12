<template>
  <div class="module-wrap">
    <div class="module-content basic-info"
         style="padding-bottom: 25px !important;">

      <div class="info-module">
        <span class="name">{{name}}</span>
        <div class="line"></div>
        <span data-coding=""
              class="update-info editbtn">编辑</span>
      </div>
      <ul class="info">
        <li>
          <label>用户名</label>
          <div>dongjiang&nbsp;&nbsp;&nbsp;&nbsp;ID 110506372</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    name: {
      type: String,
      defualt: "标题"
    },
    data: {
      type: Object,
      defualt: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>
