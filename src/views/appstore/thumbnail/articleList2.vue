<template>
  <div class="container w1000 clearfix">
    <div class="w200 left">
      <Aside />
    </div>
    <div class="bg-white w785 m0 right"
         style="width:785px; min-height: 500px;">

      <div class="module-wrap mb15 operation_wrap">
        <div class="module-head p20">
          <a href="/110506372/home?mod=picture&amp;item=list"
             class="inline mr10">全部</a>
          <a href="/110506372/home?mod=picture&amp;item=list&amp;check=1"
             class="inline mr10">已审核</a>
          <a href="/110506372/home?mod=picture&amp;item=list&amp;check=0"
             class="inline mr10">未审核</a>
          <a href="/110506372/home?mod=picture&amp;item=list&amp;check=-1"
             class="inline mr10">被退回</a>
          <a class="inline mr10 batch-button">批量管理</a>
          <!--<a href="/110506372/home?mod=picture&item=list&action=add"  class="inline right">上传作品</a></span>
        <a data-coding="U40001" data-uploadtype="picture" data-temp="moreimg" data-title="批量上传图片" class="inline right mr10 batchupload">批量上传</a></span>-->
        </div>
        <div class="module-content p10 bg-eee">

          <div class="row clearfix">
            <div class="batch-btngroup hide bg-white mlr10 p10">
              <a class="inline mr15 selecte-all">全选</a>
              <a data-field="pid"
                 data-fn="userCategory"
                 data-coding="U40001"
                 data-codings="C0000"
                 data-action="all"
                 data-title="移动内容至专辑"
                 class="inline mr15 catebtn">移动</a>
              <a data-m="article"
                 data-coding="C0002"
                 data-codings="C0000"
                 data-action="all"
                 data-title="移动文档"
                 class="catebtn mr15">
                移动文档
              </a>

              <a class="inline mr10 selecteall">删除</a>
            </div>
            <router-link to="/articleList/action">
              <div class="col-sm-6 col-md-3 p10">
                <div class="thumbnail p10 relative"
                     style="background: #fff;; overflow: hidden;">
                  <div class="cover hide"
                       style="position: absolute; top: 0; left: 0; bottom:0; width: 100%;z-index: 10;">
                    <i class="iconfont icon-checkbox">
                      <input name="checkbox"
                             type="checkbox"
                             value="6"
                             style="display: none;">
                    </i>
                  </div>

                  <a data-artcoding="C0000"
                     data-catcoding="C0002"
                     data-albumcoding="U40001"
                     data-uid="110506372"
                     data-id="6"
                     data-pid="0"
                     data-checked="0"
                     data-placement="top"
                     data-toggle="tooltip9"
                     style="position:absolute; top:15px; right:15px;"
                     data-left="0"
                     class="infos trip_arrow content_trip bg-white hide">
                    <i class="iconfont icon-down"></i>
                  </a>
                  <img src="http://www.07sucai.com/uploadfile/picture/thumb/e936d110a50f560cf8ecc8ca70708755.jpg"
                       width="100%"
                       height="150">
                  <div class="caption relative"
                       style="padding:10px 0; height:40px;">
                    <span class="inputline updata nowrap"
                          data-coding="C0000"
                          data-field="title"
                          data-id="6"
                          contenteditable="true"
                          style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">今天天气真不错</span>

                    <!--<span style=" color:#5bc0de; float:right;">1张</span>-->
                  </div>
                  <div class="relative"
                       style="border-top: 1px dotted #eaeaea; padding:10px 0; height:40px;">
                    分类：阳光
                    <i class="iconfont icon-shenhe font18 absolute"
                       style="top: 5px; right: 0; color: #5bc0de;"></i>

                  </div>
                </div>
              </div>
            </router-link>
          </div>

        </div>
        <div class="page">
          <li class="current"><a href="/110506372/home?mod=picture&amp;item=list&amp;page=1">1</a></li>
          <li class="p10">每页显示25条，共1页 6条
          </li>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Aside from "./components/Aside.vue"

export default defineComponent({
  name: 'HomeView',
  components: {
   Aside
  }
})
</script>
