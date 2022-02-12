const install = (Vue:any) => {
  Vue.config.globalProperties.const = {

   u: "/u/",
   setUrl: (param: any) => {
    const dir = param.query ? `${param.query}` : ""
    return `/u/${param.uid}${dir}`
   }
  }
}

export default install