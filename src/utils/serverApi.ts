import api from '@/api/index'

// 保存到草稿箱
export const saveTemps: any = async (params: any, proxy: any="") => {
  const result = await api['articleTempSave']({
    ...params
  })

  proxy.$hlj.message({
    type: 'info',
    msg: "保存成功"
  })
}