<template>
    <div class="right-wrap">
        <div class="linetime" v-if="dataList.length > 0">
            <div class="list-wrap" :class="index === 0 || index%2===0 ? 'single-data' : 'double-data'" v-for="(item, index) in dataList" :key="index" :style="{'margin-left': index !==0 ? `-110px` : '25px' }">
                <div class="yuan" :class="index === 0 || index%2===0 ? 'single-doted' : 'double-doted'">
                    <div class="dian"></div>
                </div>
                <div class="content-wrap" :class="index === 0 || index%2===0 ? 'single-content' : 'double-content'">
                    <div class="title" v-if="item.isDate">
                        人数：{{item.count}}
                    </div>
                    <div class="title" v-else>
                        <img :src="item.photos" onerror="this.src='/images/head_normal_100.png'" />
                        {{item.nickname}}
                    </div>
                    <div class="content flex" v-if="item.isDate">
                        <img :src="list.photos" onerror="this.src='/images/head_normal_100.png'" class="photo" v-for="(list, i) in item.list" :key="i" />
                    </div>
                    <div class="content" v-else>{{item.content}}</div>
                    <div class="time">{{item.times}}</div>
                </div>
                <div class="list-line"></div>
            </div>
        </div>
        <div style="padding-top: 25%; padding-left: 50%" v-else>暂无记录</div>
    </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
} from '@/utils'


const props: any = defineProps({
  dataList: {
    type: Array,
    default: []
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})

</script>

<style lang="less" scoped>
.right-wrap {
  overflow-x: auto;
  position: relative;
  padding: 15px;
  width: 100;
  height: 100%;
  .linetime{
    background: var(--default-font);;
    position: absolute;
    margin-top: 25%;
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
</style>
