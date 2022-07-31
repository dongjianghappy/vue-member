<template>
  <div class="music_wrap"
       :style="{left: style}">
    <div class="music_box">
      <audio autoplay
             src="http://localhost/source/public/music/12121.mp3"
             loop="loop"
             preload="preload"
             style="display:none;"></audio>
      <div id="progress_bar"
           class="progress_bar">
        <div id="time_bar"
             class="time_bar"></div>
      </div>
      <div class="music_info">
        <div class="music_pic">
          <img src="../../assets/image/20211028094303859484.jpg"
               class="Rotation song_cover">
        </div>
        <div class="music_detail">
          <p id="song_name">旅行</p>
          <p id="song_singer">许巍</p>
          <p id="musicfrom">来自 网络</p>
        </div>
      </div>
      <div class="base_ctrl">
        <a id="prev-song"
           style="-webkit-transform: rotate(180deg) !important;"><i class="iconfont icon-next"
             style="position: relative; top: 5px; font-size: 25px;"></i></a>
        <a id="play"><i class="iconfont icon-play"
             style="font-size: 25px;"></i></a>
        <a id="next-song"><i class="iconfont icon-next"
             style="font-size: 25px;"></i></a>
        <a><i class="iconfont icon-refresh1"
             style="font-size: 25px;"></i></a>
      </div>
      <div class="sound_ctrl">
        <a><i id="sound"
             class="iconfont icon-sound"
             style="font-size: 25px;"></i></a>

        <div id="sound_control"
             class="sound_control">
          <div id="sound_bar"
               class="sound_bar"></div>
        </div>
      </div>
      <div class="opt_ctrl">
        <span id="playtime"
              class="musictime">0:00</span>
      </div>
      <div class="opt_ctrl">
        <span id="showlrc"
              class="musictime">歌词</span>
      </div>
    </div>
    <div class="music_toggle"
         @click="showMusic"
         style=" padding-top:26px; -webkit-transform: rotate(180deg) !important;">
      <i id="hidemusic"
         class="iconfont icon-arrow"
         style="font-size:12px"></i>
    </div>

    <div id="lrc-wrap"
         class="hide"
         style="background:#000; position: absolute; bottom:70px; left:0; width:685px; height:350px;">
      <div>
        <div class="col-md-8"
             style="padding: 0 100px;">
          <div id="lyricWrapper">
            <div id="lyricContainer"
                 class="font14">
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="module-wrap m0"
               style="background: #181a1d; ">
            <div class="module-head b0"
                 style="background: #1f1f1f;">歌曲列表
            </div>
            <div class="module-content music-list h300">
              <ul>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="music_mini"
       v-if="!showThme">
    <div class="music_area">
      <i id="miniplay"
         class="iconfont icon-stop"
         style="font-size: 25px;"></i>
      <img src="../../assets/image/20211028094303859484.jpg"
           class="Rotation song_cover">
    </div>
    <div class="music_toggle"
         style=" padding-top:25px;">
      <i @click="showMusic"
         class="
         iconfont
         icon-arrow"
         style="font-size:12px"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },

  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const showThme = ref(false)
    const style = ref("-685px")


    function showMusic(){
      showThme.value = !showThme.value
      style.value = showThme.value ?  "0px" : "-685px"
    }
    
    return {
      showMusic,
      showThme,
      style
    }
  }
})
</script>
