<template>
  <div class="left-wrap">
      <div class="item-wrap mb15">
          <div class="item" @click="handleClick">
            <img :src="detail.image" onerror="this.src='/images/noimage.png'" />
          </div>
      </div>
      <div class="item-wrap">
        <div class="item font20" @click="handleClick">{{detail.name}}</div>
      </div>
      <div class="mt50">描述：{{detail.description}}</div>
      <div class="mt15">状态：公开</div>
      <div class="mt15">类型：重要（剩余{{detail.countdown}}天）</div>
      <div class="mt15">周期：{{detail.start_time}}-{{detail.last_time}}</div>
      <div class="mt15">闹钟：{{detail.alarm}}</div>
      <div class="mt15">成员：{{detail.roster ? detail.roster.length : 0}} 位</div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'

const props: any = defineProps({
  detail: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>

<style lang="less" scoped>
.trackmap-wrap {
  background: var(--module-background);
  top: 60px;
  bottom: 0px;
  left: 0;
  right: 0;

  .trackmap {
    background: var(--card-background);
    position: absolute;
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px;
    padding-left: 250px;
    border-radius: 8px;
    overflow: hidden;

    .left-wrap {
      background: var(--card-background);
      position: absolute;
      width: 250px;
      left: 0;
      top: 0;
      bottom: 0;
      padding: 15px;
      .item-wrap{
        justify-content: space-between;
        text-align: center;
        align-items: center;
        .item{
          flex: 1;
          img{
            width: 64px; 
            height: 64px; 
            border-radius: 50%;
          }
        }
      }
    }
    .right-wrap {
      overflow-x: auto;
      position: relative;
      padding: 15px;
      width: 100;
      height: 100%;
      .linetime{
        background: var(--default-font);;
        position: absolute;
        margin-top: 20%;
        display: flex;
        width: 2000px;
        height: 1px;
        .list-wrap{
          margin-left: 25px;
          width: 250px;
          height: 100px;
          .list-line{
            position: absolute;
            border-left: 1px solid var(--default-font);;
            height: 100px;
            width: 20px;
          }
          &.single-data{
            margin-top: -100px;
            .list-line{
              border-top: 1px solid var(--default-font);;
              border-bottom: 0 solid var(--default-font);;
              border-top-left-radius: 8px;
            }
          }
          &.double-data{
            .list-line{
              border-top: 0 solid var(--default-font);;
              border-bottom: 1px solid var(--default-font);;
              border-bottom-left-radius: 8px;
            }
          }
          .yuan{
            background: var(--module-background);
            border: 1px solid var(--default-font);;
            border-radius: 50%;
            margin-left: -5px;
            padding: 2px;
            width: 10px;
            height: 10px;
            z-index: 1;
            .dian{
              background: var(--default-font);;
              border-radius: 50%;
              width: 4px;
              height: 4px;
            }
            &.single-doted{
              margin-top: 95px;
            }
            &.double-doted{
              margin-top: -4px;
            }
          }
          .content-wrap{
            background: var(--card-background);
            margin-left: 15px;
            position: relative;
            border-radius: 8px;
            padding: 10px;
            width: 250px;
            height: 125px;
            color: var(--datetime-font);
            position: relative;
            .title{
              border-bottom: 1px solid var(--default-border);
              padding-bottom: 5px;
              height: 30px;
              img{
                width: 25px;
                height: 25px;
                border-radius: 50px;
              }
            }
            .content{
              height: 25px;
              line-height: 25px;
              .photo{
                padding: 5px;
                width: 35px;
                height: 35px;
                border-radius: 50px;
              }
            }
            &.single-content{
              margin-top: -65px;
              .time{
                position: absolute;
                left: 0;
                bottom: -28px;
                width: 180px;
              }
            }
            &.double-content{
              margin-top: 40px;
              .time{
                position: absolute;
                bottom: 135px;
                width: 180px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
