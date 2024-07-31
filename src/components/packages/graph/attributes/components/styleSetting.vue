<template>
  <!-- 边框样式 -->
  <v-collapse title="样式设置">
    <div class="clearfix" v-if="node.ftype !== 'link'">
      <div class="col-md-6 align_left h70">
        <span>填充</span>
        <div class="">
          <v-colorpicker @color="chooseColor" :color="attrs.fill" attr="fill" />
        </div>
      </div>
      <div class="col-md-6 align_center">
        <span>边框</span>
        <div>
          <v-colorpicker @color="chooseColor" :color="attrs.stroke" attr="stroke" />
        </div>
      </div>
    </div>
    <div class="h70" v-else>
      <span>边框</span>
      <div>
        <v-colorpicker @color="chooseColor" :color="attrs.stroke" attr="stroke" />
      </div>
    </div>

    <div>
      <div class="pb5">边框样式</div>
      <v-select :enums="borderStyle" v-model:value="attrs.strokeDasharray" :defaultValue="attrs.strokeDasharray = attrs.strokeDasharray ? attrs.strokeDasharray : 'solid'" />
    </div>
  </v-collapse>
</template>

<script setup lang="ts">
 import {
    inject
  } from 'vue'

  const node = inject('node')
  const {attrs, setAttrs}: any = inject('attrs')
  const borderStyle = inject('borderStyle')

  function chooseColor(param: any) {
    setAttrs(param)
  }
</script>
