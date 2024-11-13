<template>
  <div class="absolute align_right"
       style=" left: -80px; width:80px; height:500px;">
    <div class="timeline">
      <div class="line-head">归档</div>
    </div>
    {section name=l loop=$sm_srchive}
    <div class="timeline">
      <div class="line-head {if $sm_year == $sm_srchive[l].year} current {/if}">
        <a href="/blog/{$sm_blog.uid}/?mod=timeline&year={$sm_srchive[l].year}">{$sm_srchive[l].year}</a>
      </div>
      <div class="line-list"
           style="{if $sm_year == $sm_srchive[l].year} display: block; {else} display: none; {/if}">
        <ul>
          {section name=i loop=$sm_srchive[l].list}
          <li style="border-right: 4px solid rgba(245,245,245,0.2); padding-right: 10px;">
            <a href="/blog/{$sm_blog.uid}/?mod=timeline&year={$sm_srchive[l].year}&month={$sm_srchive[l].list[i].month}"
               class="{if $sm_month == $sm_srchive[l].list[i].month} current {/if}">{$sm_srchive[l].list[i].month}月</a>
          </li>
          {/section}
        </ul>
      </div>
    </div>
    {/section}
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, useStore, onMounted, ref } from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    function handleclick(){
      context.emit('onClick')
    }
    
    function init(){
      store.dispatch('common/Fetch', {
          api: 'Srchive',
          data: {}
      }).then(res => {
        dataList.value = res.result || []
      })
    }
    onMounted(init)
    return {
      handleclick
    }
  }
})
</script>
