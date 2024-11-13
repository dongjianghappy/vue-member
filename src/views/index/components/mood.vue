<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-edit" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="心情状态" :style="{width: 650, height: 650}" :confirm="true" :hasfooter="false">
  <template v-slot:content>
    <div class="mb10 plr5" style="height: 475px; overflow: auto;">
      <div class="mb15 p15" v-for="(item, index) in dataList" :key="index" style="background: var(--card-background); border-radius: 4px;">
        <div class="mb15">{{item.name}}</div>
        <div style="overflow: hidden;">
          <div class="col-md-2 p10" v-for="(list, i) in item.list" :key="i" @click="handelclick(list)">
            <div class="align_center li" :class="{current: current.id === list.id}">
              {{list.name}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="letter-form">
      <div class="mb5">心情类型：{{current.name || '-'}}</div>
      <div class="send-input-box relative">
        <textarea v-model="content" placeholder="说点什么好..." class="talkcontent-wrap" style="background: transparent; resize: none;"></textarea>
        <button @click.enter="save" class="btn absolute bg-white" :class="{disabled: !content}" :disabled="!content" style="right: 15px; bottom: 10px;">保存</button>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'v-Mood',
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const issave: any = ref(false)
    const dataList: any = ref([])
    const content: any = ref("")
    const current: any = ref({})

    //初始页面
    function init() {
      store.dispatch('common/Fetch', {
        api: "GetMoodList"
      }).then(res => {
        dataList.value = res.result

      })
    }

    function handelclick(param: any) {
      current.value = param
      issave.value = true
    }

    function save() {
      store.dispatch('common/Fetch', {
        api: "SaveMood",
        data: {
          mood: current.value.id,
          description: content.value
        }
      }).then(res => {
        store.dispatch('user/Detect')
      })
    }

    onMounted(init)
    return {
      isShow,
      dataList,
      handelclick,
      content,
      issave,
      current,
      save
    }
  }
})
</script>

<style lang="less" scoped>
.li {
  background: var(--card-background);
  height: 75px;
  border-radius: 5px;
  line-height: 75px;
  color: #fff;
}

.current {
  background: #8bc34a;
}

.letter-form {
  margin-top: 15px;
  padding: 0 5px;
  .send-input-box {
    background: var(--input-background);
    padding: 6px 11px;

    textarea {
      width: 100%;
      height: 60px;
      margin: 0px;
      padding: 5px;
      border-style: none;
      border-width: 0px;
      font-size: 14px;
      word-wrap: break-word;
      line-height: 18px;
      overflow: hidden;
      outline: none;
    }
  }
}
</style>
