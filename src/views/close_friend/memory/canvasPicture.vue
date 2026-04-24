<template>
    <div class="container trackmap-wrap fixed flex">
        <div class="trackmap">
            <div class="left-wrap">
                <div class="flex item-wrap mb15">
                    <div class="item"><img :src="loginuser.photos"></div>
                    <div class="w100">vs</div>
                    <div class="item"><img :src="detail.photo" @click="handleClick"></div>
                </div>
                <div class="flex item-wrap">
                    <div class="item">{{loginuser.nickname}}</div>
                    <div class="w100">好友</div>
                    <div class="item">{{detail.name}}</div>
                </div>
                <div class="mt50">
                    相识日期：{{detail.know_time}}
                </div>
                <div class="mt15">
                    相识地点：{{detail.know_address}}
                </div>
                <div class="mt15">
                    相识说明：{{detail.introduction}}
                </div>                
                <div class="mt15">
                    好友天数：100天
                </div>
                <div class="mt15">
                    记忆碎片：{{data.total}}个
                </div>
                <!-- <div class="absolute" style="bottom: 10px;">{{detail.know_time}} 成为好友</div> -->
            </div>
            <div class="right-wrap">
                <div class="linetime">
                    <div class="list-wrap" :class="index === 0 || index%2===0 ? 'single-data' : 'double-data'" v-for="(item, index) in data.list" :key="index" :style="{'margin-left': index !==0 ? `-110px` : '25px' }">
                        <div class="yuan" :class="index === 0 || index%2===0 ? 'single-doted' : 'double-doted'">
                            <div class="dian"></div>
                        </div>
                        <div class="content-wrap" :class="index === 0 || index%2===0 ? 'single-content' : 'double-content'">
                            <div class="title">{{item.content}}
                            </div>
                            <div style="height: 85px; overflow-y: auto;">
                              <div class="content" v-for="(list, i) in item.list" :key="i">{{list.name}}</div>
                            </div>
                            <div class="time">{{item.times}}</div>
                        </div>
                        <div class="list-line"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  useStore,
  useRoute,
  computed,
  watch,
  ref,
  onMounted,
  useRouter,
  codings
} from '@/utils'

// import Detail2 from '../components/detail2.vue'

const props: any = defineProps({
  detail: {
    type: Object,
    default: () => {
      return {}
    }
  },
  data: {
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

const {
  proxy
}: any = getCurrentInstance();
const store = useStore()
const router = useRouter();
const route = useRoute();

const loginuser: any = computed(() => store.getters['user/loginuser']);


function handleClick() {
  router.push(proxy.const.setUrl({
    uid: loginuser.value.account,
    query: `/close_friend?id=${route.query.id}`
  }))
}
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
              border-bottom: 1px solid var(--default-border); ;
              height: 25px;
            }
            .content{
              height: 25px;
              line-height: 25px;
            }
            &.single-content{
              margin-top: -65px;
              .time{
                position: absolute;
                left: 0;
                bottom: -28px;
                width: 100px;
              }
            }
            &.double-content{
              margin-top: 40px;
              .time{
                position: absolute;
                bottom: 135px;
                width: 100px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
