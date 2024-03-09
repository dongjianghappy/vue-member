<template>
<div class="container bg-white w1100 relative" style="height: 650px;">
  <Institution v-if="route.query.item === 'institution'" />
  <Condition v-if="route.query.item === 'condition'" />
  <Main v-else />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
} from '@/utils'
import Main from './main.vue'
import Institution from './institution.vue'
import Condition from './condition.vue'


export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Main,
    Institution,
    Condition
  },
  setup(props, context) {
    const route = useRoute();

    return {
      route,

    }
  }
})
</script>
