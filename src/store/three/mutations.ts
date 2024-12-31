import config from "@/components/packages/graph/config"
import { light } from "@/views/three/utils/utils"
import { geometryType, three3DType } from "@/assets/threeConst"
import three from "."

const mutations = {
  setIsEdit: (state: any, params: any) => {
    state.isEdit = params
  },
  setCurrentScene: (state: any, params: any) => {
    state.currentScene = params
  },
  setSceneConfig: (state: any, params: any) => {
    const { THREE, scene, createText, ThreeFn: { spaceName } }: any = window
    
    scene.children = scene.children.filter((item: any) => item.kind !== 'spaceName')
    spaceName({
      THREE,
      scene,
      createText,
      config: {
        name: state.config[state.currentScene].name,
        color: state.config[state.currentScene].color,
      }
    })
  },
  setCurrentTool: (state: any, params: any) => {
    state.currentTool = params
  },
  // 轨道
  setTrackLine: (state: any, params: any) => {
    state.trackLine = params
  },
  // 场景图层
  setSceneLayer: (state: any, params: any) => {
    const { scene, lightType }: any = window
    debugger
    state.sceneLayer = scene.children.filter((item: any) => item.userData.fid)
  },
  // 图层
  setLayer: (state: any, params: any) => {
    const { scene, lightType }: any = window
    
    state.lightLayer = scene.children.filter((item: any) => lightType.indexOf(item.type) !== -1)
  },
  setConfig: (state: any, params: any) => {
    state.config = params
  },
  setAddCar: (state: any, params: any) => {
    state.carList.push(params)
  },
  setCurrentCar: (state: any, params: any) => {
    state.currentCar = params
  },
  setAddStar: (state: any, params: any) => {
    state.stars.push(params)
  },
  // 更新几何元素对象数据
  setGeometry: (state: any, params: any) => {
    const { position, parameters, material } = params
    const { THREE, scene, ThreeFn }: any = window
    
    // 设置宽高
    let x, y, z
    switch(state.geometry.geometry.type){
      case 'BoxGeometry' :
        x = parseInt(parameters.width) / state.geometry.geometry.parameters.width
        y = parseInt(parameters.depth) / state.geometry.geometry.parameters.depth
        z = parseInt(parameters.height) / state.geometry.geometry.parameters.height
        state.geometry.scale.set(x, y, z)
      break
      case 'PlaneGeometry' :
        x = parseInt(parameters.width) / state.geometry.geometry.parameters.width
        z = parseInt(parameters.height) / state.geometry.geometry.parameters.height
        state.geometry.scale.set(x, z)
      break
      case 'CircleGeometry' :
        x = parseInt(parameters.radius) / state.geometry.geometry.parameters.radius
        z = parseInt(parameters.segments) / state.geometry.geometry.parameters.segments
        state.geometry.scale.set(x, z)
      break
      case 'ConeGeometry' :
        x = parseInt(parameters.radius) / state.geometry.geometry.parameters.radius
        y = parseInt(parameters.height) / state.geometry.geometry.parameters.height
        z = parseInt(parameters.radialSegments) / state.geometry.geometry.parameters.radialSegments
        state.geometry.scale.set(x, y, z)
      break
      case 'CylinderGeometry' :
        x = parseInt(parameters.radiusTop) / state.geometry.geometry.parameters.radiusTop
        y = parseInt(parameters.height) / state.geometry.geometry.parameters.height
        z = parseInt(parameters.radiusBottom) / state.geometry.geometry.parameters.radiusBottom
        state.geometry.scale.set(x, y, z)
      break
      case 'SphereGeometry' :
        x = parseInt(parameters.radius) / state.geometry.geometry.parameters.radius
        y = parseInt(parameters.widthSegments) / state.geometry.geometry.parameters.widthSegments
        z = parseInt(parameters.heightSegments) / state.geometry.geometry.parameters.heightSegments
        state.geometry.scale.set(x, y, z)
      break
    }

    // 设置名称
    state.geometry.name = params.name

    // 设置坐标
    state.geometry.position.x = params.position.x
    state.geometry.position.y = params.position.y
    state.geometry.position.z = params.position.z  

    // 几何类型设置
    if(geometryType.indexOf(state.geometry.geometry.type) > -1){
      debugger
      // 设置颜色
      if(material.isMorePlane == '0'){
        if(state.geometry.material instanceof Array){
          state.geometry.material = state.geometry.material[0]
        }
        state.geometry.material.color = new THREE.Color(material.color)

        const TextureLoader = new THREE.TextureLoader()
        TextureLoader.load(material.image, (texture: any) => {
          state.geometry.material.map = texture
          state.geometry.material.map.needsUpdate = true
        })

        debugger
        // 发光属性
        state.geometry.material.emissive = new THREE.Color(material.emissive)
        state.geometry.material.emissiveIntensity = material.intensity
        state.geometry.material.sepcular = new THREE.Color(material.sepcular)
      }else{
        let arr: any
        if(state.geometry.material instanceof Array){
          arr = state.geometry.material
        }else{
          arr = []
          for(let i = 0; i < 6; i++){
            arr.push(state.geometry.material.clone())
          }
        }
        material.map.forEach((item: any, index: any) => {
          //颜色
          if(item.color){
            let _color = item.isUse == '1' ? item.color : '#ffffff'
            arr[index].color = new THREE.Color(_color)
          }
          //图片
          if(item.image){
            let _image = item.isUse == '1' ? item.image : '/images/three/3.jpg'
            new THREE.TextureLoader().load(_image, (texture: any) => {
              arr[index].map = texture
              arr[index].map.needsUpdate = true
            })
          }
        })
        state.geometry.material = arr
      }
    }
    
    // 设置Z轴旋转
    state.geometry.rotation.x = parseFloat(state.geometryInfo.rotation.x)
    state.geometry.rotation.y = parseFloat(state.geometryInfo.rotation.y)
    state.geometry.rotation.z = parseFloat(state.geometryInfo.rotation.z)
    state.geometryInfo.isEdit = true // 标记对象更改过
    state.geometry.userData = state.geometryInfo
  },
  // 场景元素对象数据存储
  setGeometryInfo: (state: any, params: any) => {
    state.geometry = params

    // 如果是组，那么获取组对象上的数据
    let parentData = params
    if(params.parent.type === 'Group'){
      parentData = params.parent
    }
    state.geometryInfo = parentData.userData
    state.geometryInfo.type = parentData.type !== 'Mesh' ? parentData.type : parentData.geometry.type
  },
  // 更新文本元素对象数据
  updateTextItem: (state: any, params: any) => {
    const { THREE, scene, createText, ThreeFn, store }: any = window
    state.textInfo.isEdit = true // 标记对象更改过
    scene.children = scene.children.filter((item: any) => item.uuid !== state.textInfo.uuid)
    ThreeFn.textTool({
      THREE,
      scene,
      ThreeFn,
      actionType: 'render',
      createText,
      store,
      data: params
    })
  },
  // 文本设置数据存储
  setTextInfo: (state: any, params: any) => {
    state.textInfo = params
  },
  // 更新光源元素对象数据
  updateLightItem: (state: any, params: any) => {
    const { THREE }: any = window
    const { lightInfo } = state
    const { parameters } = lightInfo

    state.geometry.userData = lightInfo
    state.geometry.name = lightInfo.name // 设置名称
    state.geometry.color = new THREE.Color(parameters.color) // 颜色
    state.geometry.intensity = parameters.intensity // 强度
    
    // 设置参数    
    switch(state.geometry.type){
      case 'HemisphereLight' :
        state.geometry.groundColor = new THREE.Color(parameters.groundColor)
        break
      case 'PointLight' :
        state.geometry.groundColor = new THREE.Color(parameters.groundColor)
        state.geometry.distance = parameters.distance
        state.geometry.decay = parameters.decay
        break
      case 'RectAreaLight' :
        state.geometry.width = parameters.width
        state.geometry.height = parameters.height
        break
      case 'SpotLight' :
        state.geometry.distance = parameters.distance
        state.geometry.angle = parameters.angle
        state.geometry.penumbra = parameters.penumbra
        state.geometry.decay = parameters.decay
        break
    }
    lightInfo.isEdit = true // 标记对象更改过
  },
  // 光源设置数据存储
  setLightInfo: (state: any, params: any) => {
    state.geometry = params
    state.lightInfo = params.userData
  },
  // 更新辅助元素对象数据
  updateHelperItem: (state: any, params: any) => {
    const { THREE, scene, ThreeFn }: any = window
    const { helperInfo } = state
    const { parameters } = helperInfo

    state.geometry.userData = helperInfo
    state.geometry.name = helperInfo.name // 设置名称
    
    helperInfo.isEdit = true // 标记对象更改过
    // 网格, 先删除再重新创建
    scene.children = scene.children.filter((item: any) => item.uuid !== state.geometry.uuid)
    ThreeFn[state.geometry.type]({
      THREE,
      scene,
      ThreeFn,
      actionType: 'render',
      data: params
    })
  },
  // 辅助设置数据存储
  setHelperInfo: (state: any, params: any) => {
    debugger
    state.geometry = params
    state.helperInfo = params.userData
  },
  // 设置路线
  setRoadLine: (state: any, params: any) => {
    state.roadLoad = params
  },
  // 设置场景路线
  setSceneRoadLine: (state: any, params: any) => {
    const { THREE, scene, ThreeFn: { roadLine } }: any = window
    roadLine({
      THREE,
      scene,
      ...params
    })
  },
  // 设置当前编辑
  setCurrentEdit: (state: any, params: any) => {
    state.currentEdit = params
  }
}

export default mutations
// 463