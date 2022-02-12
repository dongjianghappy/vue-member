<template>
  <div class="container w1000 clearfix">
    <div class="w200 left">
      <Aside />
    </div>
    <div class="w785 m0 right">

      <div class="module-wrap mb15">
        <div class="module-head p20">发布内容</div>
        <div class="module-content form-wrap detail"
             style="padding: 25px 50px !important;">
          <ul>

            <div class="alert alert-warning alert-dismissible"
                 role="alert">退回说明：{$sm_body.return_reason}</div>

            <li>
              <label>标题</label>

              <input id="title"
                     field="title"
                     type="text"
                     value="{$sm_body.title}"
                     placeholder="请输入标题"
                     class="input-sm input-350" />
            </li>
            <li>
              <label>标签</label>
            </li>
            <li data-field="method">
              <label>来源方式</label>
              <input type="radio"
                     name="method"
                     value="0" /> 网络分享&nbsp;&nbsp;&nbsp;
              <input type="radio"
                     name="method"
                     value="1" /> 原创&nbsp;&nbsp;&nbsp;
              <input type="radio"
                     name="method"
                     value="2" /> 投稿
            </li>
            <li>
              <label>文章来源</label>
              <input type="text"
                     value="{$sm_body.source}"
                     placeholder="来源名称"
                     class="input-sm"
                     field="source">
              <input type="text"
                     value="{$sm_body.source_url}"
                     placeholder="来源地址"
                     class="input-sm input-350"
                     field="source_url">
            </li>
            <li class="catewrap">
              <label>所属分类</label>
            </li>
            <!--<li><label>提供下载</label><a id="uploadfile">上传文件</a></li>-->
            <li>
              <label>预览图</label>
            </li>
          </ul>
          <div class="edit-article"></div>
          <div class="summary mt25">
            <h2 class="mb5 font18 cl-999">摘要说明</h2>
            <textarea field="summary"
                      id="summary"
                      class="w-full"></textarea>
          </div>
          <v-button>保存</v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Aside from "./components/Aside.vue"

export default defineComponent({
  name: 'HomeVieww',
  components: {
   Aside
  }
})
</script>
