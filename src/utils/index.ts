import { defineComponent, getCurrentInstance, computed, ref, watch, watchEffect, reactive, defineProps, defineEmits, defineExpose, provide, inject } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted, onUnmounted, onBeforeUnmount } from '@vue/runtime-core';
import codings from "@/assets/coding"
import { getUid, getChannel, chooseCate, getParam, getQuery, durationTrans, timeToSeconds, getParent, showParent, writeNewStyle, toBlob } from './auth'
import selection from "./selection"

export {
  defineComponent,
  defineProps,
  defineEmits,
  defineExpose,
  provide,
  inject,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  ref,
  watch,
  watchEffect,
  reactive,
  codings,
  getUid,
  selection,
  getChannel,
  chooseCate,
  getParam,
  getQuery,
  durationTrans,
  timeToSeconds,
  getParent,
  showParent,
  writeNewStyle,
  toBlob
};