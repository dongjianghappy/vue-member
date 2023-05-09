const component = require.context(
  // 其组件目录的相对路径
  '../components/packages',
  // 是否查询其子目录
  true
)

const install = (Vue:any) => {

  let arr: any = []
  component.keys().map(item=>{
    if(item.match("./*/index.vue") && item.split("/").length-1 === 2){
      arr.push(item)
    }
  })
  

  arr.forEach((fileName: string) => {
    
    if (fileName.endsWith('index.vue')) {
      
      // 获取组件配置
      const componentConfig = component(fileName)

      const name = fileName.split("/")[1].toLowerCase()

      // 转换为短横线分割命名法
      const componentName = `v-${name.replace(/^\.\//, '').replace(/\.\w+$/, '')}`
      console.log(componentName+"====================")

      // 全局注册组件
      Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
      )
    }
  })
}

export default install
