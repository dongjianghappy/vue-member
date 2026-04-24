<template>
    <div class="module-wrap nobg mb10">
        <div class="service-list">
            <div class="ranking-item" v-for="(item, index) in ranking" :key="index" @click="handleClick(item)">
                <i class="item-icon iconfont icon-ranking" />
                <div class="item-title">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  useStore,
  useRouter,
  getUid,
  ref
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const module = computed(() => store.getters['user/config_talk'].creator_center);


const ranking = ref([
    {
        name: "项目榜",
        icon: "ranking",
        color: "#ff9800",
        type: "item",
    },
    {
        name: "用户榜",
        icon: "ranking",
        color: "#ff9800",
        type: "user",
    },
    {
        name: "热力值",
        icon: "ranking",
        color: "#ff9800",
        type: "coin",
    },
]);

function handleClick(param: any = "") {
  router.push(proxy.const.setUrl({
    uid: getUid(),
    query: `/schedule?mod=ranking&type=${param.type}`
  })) 
}
</script>

<style lang="less">
.service-list {
    display: flex;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr); /* 3列布局 */
    background-color: none;
    padding: 0;

    .ranking-item {
        flex: 1;
        padding: 15px;
        background: var(--module-background);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;

        .item-icon {
            height: 36px;
            font-size: 32px;
            color: var(--default-font);
        }
        .item-title {
            font-size: 16px;
            color: var(--default-font);
        }
        // }
    }
}
</style>