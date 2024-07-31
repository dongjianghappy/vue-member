<template>
  <v-collapse title="高级设置" :iscollapse="true" v-if="node.ftype !== 'start' && node.ftype !== 'link'">
      <NodeSpeech :data="node.data" v-if="node.ftype !== 'link' && node.ftype !=='intentionLink'" />
      <LinkSpeech :data="node.data" v-else />
    </v-collapse>
</template>

<script setup lang="ts">
import NodeInfo from './nodeInfo.vue'
import LinkLine from './linkLine.vue'
 import {
    inject
  } from 'vue'

  const node = inject('node')
  const {attrs, setAttrs}: any = inject('attrs')
  const borderStyle = inject('borderStyle')

  function chooseColor(param: any) {
    setAttrs(param)
  }

  function textBlur(e: any, attr: any) {
    setAttrs({
      islabel: true,
      attr: "text",
      value: e.currentTarget.innerHTML
    })
  }
</script>
