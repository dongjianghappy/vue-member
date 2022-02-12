<template>
  <div class="module-wrap aside_fixed">
    <div class="module-head p15 ">
      <h3 class="nobold font16 ">今日排行榜</h3>
    </div>
    <div class="module-content p0 font12">
      <ul>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">1</span>
            <a href="/ziyuan/4347.html "
               title="仿阿里云jQuery水平滑动手风琴切换特效"
               target="_blank "
               class=" nowrap p0 ">仿阿里云jQuery水平滑动手风琴切换特效</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">205</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">2</span>
            <a href="/ziyuan/8845.html "
               title="jQuery卡通图像手风琴悬停特效"
               target="_blank "
               class=" nowrap p0 ">jQuery卡通图像手风琴悬停特效</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">76</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">3</span>
            <a href="/ziyuan/900.html "
               title="宽屏大气餐厅菜品展示响应式模板"
               target="_blank "
               class=" nowrap p0 ">宽屏大气餐厅菜品展示响应式模板</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">56</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">4</span>
            <a href="/ziyuan/2859.html "
               title="侧边栏扁平化可伸展导航"
               target="_blank "
               class=" nowrap p0 ">侧边栏扁平化可伸展导航</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">50</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">5</span>
            <a href="/ziyuan/897.html "
               title="宽屏大气婚纱bootstrap响应式模板"
               target="_blank "
               class=" nowrap p0 ">宽屏大气婚纱bootstrap响应式模板</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">30</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">6</span>
            <a href="/ziyuan/895.html "
               title="徒步旅行电子商务响应式网站模板"
               target="_blank "
               class=" nowrap p0 ">徒步旅行电子商务响应式网站模板</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">29</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">7</span>
            <a href="/ziyuan/898.html "
               title="带轮播图耐克运动鞋商品网站模板"
               target="_blank "
               class=" nowrap p0 ">带轮播图耐克运动鞋商品网站模板</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">28</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">8</span>
            <a href="/ziyuan/4028.html "
               title="jQuery HTML5本地存储购物篮代码"
               target="_blank "
               class=" nowrap p0 ">jQuery HTML5本地存储购物篮代码</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">27</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">9</span>
            <a href="/ziyuan/9976.html "
               title="HTML5网站布局排版粘性导航栏静态模板"
               target="_blank "
               class=" nowrap p0 ">HTML5网站布局排版粘性导航栏静态模板</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">27</span>
          </div>
        </li>
        <li class="item-thum-wrap mb10 ">
          <div class="item-title relative pl40 pr40 ">
            <span class="num ">10</span>
            <a href="/ziyuan/16940.html "
               title="点击即删除的APP应用vue组件通知卡片"
               target="_blank "
               class=" nowrap p0 ">点击即删除的APP应用vue组件通知卡片</a>
            <span class="absolute cl-ccc "
                  style="top:0 ; right: 0 ">26</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="module-foot">查看更多</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx}:any = getCurrentInstance();
      const store = useStore();
      const userInfo = computed(() => store.getters['common/userInfo']);
      
      return { 
        userInfo
      }
    },
})
</script>
