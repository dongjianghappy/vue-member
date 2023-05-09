import { defineComponent, getCurrentInstance, computed, ref, watch, reactive } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import codings from "@/assets/coding"
import { getUid, getChannel, chooseCate, getParam, getQuery, getParent, showParent } from './auth'
import selection from "./selection"

export {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  onMounted,
  ref,
  watch,
  reactive,
  codings,
  getUid,
  selection,
  getChannel,
  chooseCate,
  getParam,
  getQuery,
  getParent,
  showParent
};