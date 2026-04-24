<template>
<v-popover ref="popover" content="选择图片" arrow="tb" offset="right" :move="-350" keys="popover-choose-image" @onClick="handleclick">
  <div style="width: 450px; height: 260px;">
    <template v-if="dataList.length">
      <div class="module-wrap">
        <div class="module-content plr15 clearfix" style="height: 205px; overflow-y: auto;">
          <div class="left align_center relative" style="width: 120px; height: 120px;" v-for="(item, index) in dataList" :key="index" @click="handleChoose(item)">
            <v-righticon v-if="imageList.indexOf(item) > -1" />
            <img :src="item" onerror="this.src='/images/head_normal_100.png'" class="photos p5" style="width: 120px; height: 120px;">
          </div>
        </div>
      </div>
    </template>
    <v-loding v-else />
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  getUid,
  watch,
  defineEmits,
  defineProps
} from '@/utils'
import {
  useStore
} from 'vuex'


  const emit: any = defineEmits(['choose'])
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
      imageList: {
      type: Array,
      default: () => {
        return []
      }
    }
  })

    const store = useStore();
    const dataList: any = ref([])
    const popover: any = ref(null)

        function handleChoose(param: any) {
      emit('choose', param)
    }

    function init() {
      console.log("cccssss");
      
    store.dispatch('common/Fetch', {
      api: "closeFriendContentDetails",
      data: {
        id: props.data.id,
        coding: props.data.coding
      }
    }).then((res: any) => {
      dataList.value = res.result.image
    })


      
    }

        function handleclick() {
      init()
    }

    
</script>
