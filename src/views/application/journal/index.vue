<template>
  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="menu"
               title="我的日志"
               :render="Grouping">
        <template v-slot:button>
          <span class="right"
                @click="add('add')"
                v-if="currentUser"><i class="iconfont icon-anonymous-iconfont font24" /></span>

        </template>
        <template v-slot:aside>
          <ul>
            <li v-for="(item, index) in userGroup"
                :key="index"
                @click="handleclick(`/journal?item=list&id=${item.id}`)"
                class="aside">
              <i class="iconfont icon-dot font20"></i> {{item.name}}({{item.num}})
              <span class="right"
                    @click.stop="add('edit', item)"
                    v-if="currentUser && item.type!=='1'"><i class="iconfont icon-edit"></i></span>
            </li>
          </ul>
        </template>

      </v-aside>
    </div>
    <div class="m0 right"
         style="width: 910px">

      <Action v-if="query.item === 'details'"
              :action="query.action" />
      <List v-else
            :item="query.item" />
    </div>
  </div>
  <AddGroup :showAlbum="true"
            :render="Grouping"
            v-model:showFlag="showAlbum"
            v-if="showAlbum"
            :data="currentData" />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, computed, useStore, useRouter, useRoute, ref, getUid } from '@/utils'
import List from "./list.vue"
import Action from "./article_action.vue"
import AddGroup from './components/addGroup.vue'
import * as consts from '@/assets/const'

export default defineComponent({
  name: 'HomeView',
  components: {
   List,
   Action,
   AddGroup
  },
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const currentUser = computed(() => store.getters['common/currentUser']);
    const groups = computed(() => store.getters['common/groups']);
    let query: any = computed(() => route.query || "");
    const showAlbum = ref(false)
    const currentData = ref({})
    const userGroup = ref([])

    const menu: any = consts.journal;
    menu.map((item: any) => {
      item.path = `/journal?item=${item.value}`
    }) 
        
    function Grouping(){
      store.dispatch('common/Fetch', {
          api: "JournalCate",
          data: {
            uid: getUid()
          }
      }).then(res => {

        userGroup.value = res.result
     
      })
    }

    function handleclick(param:any){
      router.push(proxy.const.setUrl({
        uid: getUid(),
        query: param
      }))
    }


    function add(action: any, item: any){
      debugger
      showAlbum.value = true
      currentData.value = {
        action,
        item
      }
    }    
    
    onMounted(()=>{
      Grouping()
    })

    return {
      currentUser,
      handleclick,
      groups,
      query,
      menu,
      add,
      showAlbum,
      currentData,
      userGroup
    }
  }  
})
</script>
