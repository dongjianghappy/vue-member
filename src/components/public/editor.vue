<template>
<div :class="{screen: isScreen}" style="background: #fff; border: 1px solid #eee; width: 100%; height: 100%;">
  <div class="editor-wrap" style="border-bottom: 1px solid #eee; min-height: 40px;">
    <ul class="editor-button">
      <li class="left pl10">
        <v-popover :isShowss="popoverStatus" content='H<i class="iconfont icon-triangle" title="标题">' arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
          <ul class="title">
            <li @click="handelClick({type: 'title', value: 0})">
              <h1>一级标题</h1>
            </li>
            <li @click="handelClick({type: 'title', value: 1})">
              <h2>二级标题</h2>
            </li>
            <li @click="handelClick({type: 'title', value: 2})">
              <h3>三级标题</h3>
            </li>
            <li @click="handelClick({type: 'title', value: 3})">
              <h4>四级标题</h4>
            </li>
            <li @click="handelClick({type: 'title', value: 4})">
              <h5>五级标题</h5>
            </li>
            <li @click="handelClick({type: 'title', value: 5})">
              <h6>六级标题</h6>
            </li>
          </ul>
        </v-popover>
      </li>
      <li class="left" @click="handelClick('bold')" title="粗体" style="font-weight: bold;">B</li>
      <li class="left" @click="handelClick('italic')" title="斜体" style="font-style: italic;">I</li>
      <li class="left" @click="handelClick('through')" title="删除线" style="text-decoration: line-through;">U</li>
      <li class="left" @click="handelClick('disorder')" title="无序列表"><i class="iconfont icon-list" title="无序列表"></i></li>
      <li class="left" @click="handelClick('orderly')" title="有序列表"><i class="iconfont icon-youxuliebiao"></i></li>
      <li class="left" @click="handelClick('table')" title="表格"><i class="iconfont icon-table"></i></li>
      <li class="left" @click="handelClick('line')" title="插入分割线"><i class="iconfont icon-line"></i></li>
      <li class="left" @click="handelClick('link')" title="链接"><i class="iconfont icon-link"></i></li>
      <li class="left" title="图片">
        <v-popover :isShowss="popoverStatus" content='<i class="iconfont icon-img">' arrow="tb" offset="right" :move="-30" :keys="`static_${index}`">
          <ul class="title">
            <li @click="handelClick('img')">
              插入
            </li>
            <li>
              <v-spaces @selectImage="selectImage">空间</v-spaces>
            </li>
          </ul>
        </v-popover>
      </li>
      <li class="left" title="代码">
        <v-popover :isShowss="popoverStatus" content='<i class="iconfont icon-code font20">' arrow="tb" offset="right" :move="-45" :keys="`static_${index}`">
          <ul class="title">
            <li @click="handelClick({type: 'code', value: 0})">
              HTML
            </li>
            <li @click="handelClick({type: 'code', value: 1})">
              CSS
            </li>
            <li @click="handelClick({type: 'code', value: 2})">
              JavaScript
            </li>
          </ul>
        </v-popover>

      </li>
      <li class="left" @click="handelClick('- 无序列表')" title="无序列表"><i class="iconfont icon-list" title="无序列表"></i></li>
      <li class="left" @click="handelClick('+ 有序列表')" title="有序列表"><i class="iconfont icon-youxuliebiao"></i></li>
      <li class="left" @click="handelClick('clear')"><i class="iconfont icon-amy-Clearcache" title="清空"></i></li>
      <li :class="{current: isview}" @click="isview=!isview" title="展示"><i class="iconfont icon-view"></i></li>
      <li @click="handelClick('Screen')" title="全屏"><i class="iconfont icon-screen-full"></i></li>
    </ul>
  </div>
  <div :class="{height: isScreen, minHeight: !isScreen}" style="display: flex; flex-direction: row;">
    <div class="relative" style="width: 50%; border-right: 1px solid #eee;">
      <perfect-scrollbar>

        <textarea id="editor" v-model="contentsss" @input="handleInput" style="
    left: 0;
    width: 100%;
    height: 100p%;
    border: none;
    outline: none;
    overflow: hidden;
    resize: none;"></textarea>
      </perfect-scrollbar>
    </div>
    <div class="markdown" style="width: 50%; " v-show="isview">
      <perfect-scrollbar>
        <div class="p10" v-html="marked.parse(contentsss)" @mouseup="handleMouseup"></div>
      </perfect-scrollbar>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  selection
} from '@/utils'
import {
  marked
} from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: any, lang: any) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, {
      language
    }).value;
  },
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
export default defineComponent({
      name: 'v-Search',
      props: {
        style: {
          type: Object,
          default: () => {
            return {}
          }
        },
        contentsss: {
          type: String,
          default: ""
        },
        data: {
          type: Object,
          default: () => {
            return {}
          }
        }
      },
      emits: ['update:contentsss'],
      setup(props, context) {
        const {
          ctx
        }: any = getCurrentInstance();
        const isview: any = ref(true)
        const isScreen: any = ref(false)
        // 预览状态
        const popoverStatus: any = ref(false)
        const content: any = ref(props.contentsss)
        const preview: any = ref(marked.parse(props.contentsss))

        const Doc: any = document

        const data: any = {
          link: '[链接](http://www.dongblog.com)',
          img: '![Description](http://www.07sucai.com/images/album/16875.jpg)',
          line: '------',
          orderly: '1 列表内容',
          disorder: '- 列表内容'
        }

        const array = ['link', 'img', 'line', 'orderly', 'disorder']

        const code = [{
              name: 'html',
              value: `${'```html'}

${'```'}`
      },
      {
        name: 'css',
              value: `${'```css'}

${'```'}`
      },
      {
        name: 'javaScript',
              value: `${'```javaScript'}

${'```'}`
      }
    ]

    // 标题
    const title = [{
        name: '一级标题',
        value: '# '
      },
      {
        name: '二级标题',
        value: '## '
      },
      {
        name: '三级标题',
        value: '### '
      },
      {
        name: '四级标题',
        value: '#### '
      },
      {
        name: '五级标题',
        value: '##### '
      },
      {
        name: '六级标题',
        value: '###### '
      }
    ]
    const table = `|column1|column2|column3|
|-|-|-|
|content1|content2|content3|`

    // 监听
    watch(props, async (newValues, prevValues) => {
      setTimeout(() => {
        autoTextarea()
      }, 10)
    })

    // 文本域响应式设置
    function autoTextarea() {
      const editor: any = document.getElementById('editor')
      if (editor.scrollHeight > 500) {
        editor.style.height = editor.scrollHeight + "px"
      }

    }

    // 插入内容
    function saveSelectionText(param: any) {
      const editor: any = document.getElementById('editor')
      popoverStatus.value = true
      editor.focus();

      let str: any = ""

      let type = typeof param

      // 标题设置
      if (type === 'object') {
        debugger
        if(param.type === 'title'){
          str = title[param.value].value + title[param.value].name
        }else if(param.type === 'code'){
          str = code[param.value].value
        }else if(param.type === 'image'){
          str = param.value
        }

      } else {
        if (param === 'bold') {
          str = "**粗体**"
        } else if (param === 'italic') {
          str = "*斜体*"
        } else if (param === 'through') {
          str = "~~下划线~~"
        } else if (param === 'table') {
          str = table
        } else if(array.indexOf(param) > -1) {
          str = data[param]
        }
      }

      if (Doc.selection) {
        var sel = Doc.selection.createRange();
        sel.text = str;
      } else if (typeof editor.selectionStart == 'number' &&
        typeof editor.selectionEnd == 'number') {
        var startPos = editor.selectionStart,
          endPos = editor.selectionEnd,
          cursorPos = startPos,
          tmpStr = editor.value;
        editor.value = tmpStr.substring(0, startPos) + str +
          tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        editor.selectionStart = editor.selectionEnd = cursorPos;
      } else {
        editor.value += str;
      }
      content.value = editor.value;
      preview.value = marked.parse(editor.value);

      context.emit('update:contentsss', content.value)
      setTimeout(() => {
        popoverStatus.value = false
      }, 1000)
    }

    function handelClick(param: any) {
      if (param === 'clear') {
        content.value = ""
        preview.value = ""
        context.emit('update:contentsss', content.value)
        autoTextarea()
        return
      } else if (param === 'Screen') {
        isScreen.value = !isScreen.value
        return
      }
      saveSelectionText(param)
    }

    function handleInput(param: any) {
      saveSelectionText("")
    }

    function selectImage(param: any) {
      saveSelectionText(param)
    }

    function handleMouseup(e: any) {
      selection.mouseup(e, props.data.tag)
    }

    return {
      isview,
      isScreen,
      content,
      popoverStatus,
      marked,
      preview,
      handelClick,
      handleInput,
      selectImage,
      handleMouseup
    }
  }
})
</script>

<style scoped>
.screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
}

.minHeight {
  height: 500px;
}

.height {
  height: 100%;
}

textarea {
  box-sizing: border-box;
  padding: 20px 20px 30px;
  color: #2c3e50;
  font-size: 14px;
  font-family: menlo, Ubuntu Mono, consolas, Courier New, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
  line-height: 1.5;
  word-break: break-all;
  min-height: 490px;
}

.ps {
  height: 500px;
}
</style>
