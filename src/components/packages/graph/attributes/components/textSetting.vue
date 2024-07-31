<template>
  <!-- 边框样式 -->
  <v-collapse title="文本设置">
    <!-- 名称 -->
    <div class="mb15">
      <div class="pb5">名称
        <span><v-colorpicker @color="chooseColor" :color="attrs.textColor" :islabel="true" attr="fill" /></span>
      </div>
        <div contenteditable="true" class="content-editable" @blur="textBlur" style="display: inline-block;" v-html="attrs.text">
        </div>
    </div>
    
    <!-- 描述 -->
    <div>
        <div class="pb5">描述
        </div>
          <div contenteditable="true" class="content-editable" @blur="desBlur" style="display: inline-block; min-height: 60px" v-html="node.data && node.data.description">
            
          </div>
      </div>
      
    </v-collapse>
</template>

<script setup lang="ts">
 import {
    inject
  } from 'vue'

  const { node, setDates }: any = inject('node')
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

  function desBlur(e: any) {
    setDates({
      name: 'description',
      value: e.currentTarget.innerHTML
    })
  }
</script>
