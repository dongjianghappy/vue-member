import { threeConfig } from "@/assets/threeConst";
import { textInfo } from "@/views/three/utils/data/geometry";

// 文本
export const textTool = (params: any = {}, item: any) => {
  const { ThreeFn, THREE, scene, store} = params

  const config = textInfo
  let name = config.name
  let size = config.size
  let color: any = config.color
  
  if(params.actionType){
    const { data } = params
    name = data.name
    size = data.size
    color = data.color
  }


  const exitButtonText2 = params.createText(name, size);
  exitButtonText2.material.color = new THREE.Color(color)
  exitButtonText2.kind = 'text'

  // 新增设置userData数据
  if(!params.actionType){
    const initData = { ...textInfo }
    initData.fid = params.data.id
    initData.uuid = exitButtonText2.uuid
    params.data = initData
  }

  scene.add(exitButtonText2);
  ThreeFn && ThreeFn.customizeItem(params, exitButtonText2)
}