<template>
<div class="module-wrap">
  <div class="module-content p25 font16" style="min-height: 500px; line-height: 30px;" v-html="data.content">
    
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  codings,
  useRouter,
  getUid
} from '@/utils'

const props: any = defineProps({
  data: {
    type: String,
    default: ""
  },
})

</script>

<style lang="less" scoped>
.article-wrap {
  width: 835px;

  .article-head {
    position: relative;
    border-bottom: 1px solid var(--default-border);
    padding-bottom: 25px;

    h2 {
      font-size: 32px;
      color: #999;
    }

    .author {
      margin-top: 20px;
      font-size: 14px;
      color: #888;
      height: 20px;
      line-height: 20px;

      span {
        display: inline-block;
        margin-right: 10px;
        height: 20px;
        float: left;

        img {
          margin-top: -7px;
          border-radius: 50%;
          width: 35px;
          height: 35px;
        }
      }
    }

    .collect {
      background: #fafafa;
      position: absolute;
      top: 25px;
      right: 25px;
      border: 1px solid #e5e5e5;
      padding: 10px;
      color: #a1a1a1;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: #eee;
      }
    }

    .label {
      margin-top: 20px;
      color: #888;
    }

    .original_genuine {
      position: absolute;
      top: 25px;
      right: 15px;
      border: 1px solid #5bc0de;
      padding: 2px 5px;
      color: #5bc0de;
      display: none;
    }
  }

  .article-content {
    border-bottom: 1px solid var(--default-border);
    padding: 25px 0;
    line-height: 30px;
    font-size: 14px;
    color: #3d464d;

    h2,
    h3 {
      margin-bottom: 20px;
    }

    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .summary {
      background: #f1f1f1;
      padding: 10px;
      line-height: 30px;
    }

    img {
      max-width: 835px;
    }
  }

  .post_author {
    margin: 30px 0;
    font-size: 12px;
    color: #888;
    text-align: right;
  }

  .img {
    position: relative;
    text-align: center;

    .preg {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 35%;
      height: 100%;
      // cursor: url(/source/public/images/pic_prev.cur), auto;
    }

    .next {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 35%;
      height: 100%;
      // cursor: url(/source/public/images/pic_next.cur), auto;
    }

    img {
      width: 100%;
    }
  }

  .related {
    padding: 25px 0;
    font-size: 16px;

    .preg {
      padding: 5px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .next {
      padding: 5px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .thumbile {
    margin-bottom: 50px;
    width: 100%;
    text-align: center;

    .demo-count,
    .down-count {
      font-size: 16px;
      color: #999;
    }

    a {
      display: inline-block;
      font-size: 18px;
      padding: 0 25px;
      height: 45px;
      line-height: 45px;

      i {
        color: #fff !important;
      }

      &.down {
        background: #5bc0de;
        font-size: 24px;
        color: #fff;

        // -webkit-box-shadow: 0 3px 0 #5399af;
        // box-shadow: 0 3px 0 #5399af;
        &:hover {
          background: #3eb3d6;
        }
      }

      &.demo {
        background: #fc7553;
        font-size: 24px;
        color: #fff;

        // -webkit-box-shadow: 0 3px 0 #b5482c;
        // box-shadow: 0 3px 0 #b5482c;
        &:hover {
          background: #e24c26;
        }
      }

      &.collect {
        box-shadow: 0px 1px 5px #999;
        background: #5cb85c;
        color: #fff;

        &:hover {
          background-color: #5cb85c;
          border: 1px solid #5cb85c;
        }
      }
    }
  }

  .thumbile-count {
    border-bottom: 1px solid #ddd;
    padding-bottom: 50px;
    width: 100%;
    text-align: center;

    .down-count {
      width: 20%;
      display: inline-block;
      margin-right: 50px;
      color: #1d9ce8;

      span {
        color: #fc9700;
      }
    }

    .demo-count {
      width: 20%;
      display: inline-block;
      color: #1d9ce8;

      span {
        color: #fc9700;
      }
    }
  }
}
</style>
