import config from "@/components/packages/graph/config"
import { light } from "@/views/three/utils/utils"

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
  // 轨道
  setTrackLine: (state: any, params: any) => {
    state.trackLine = params
  },
  // 场景图层
  setSceneLayer: (state: any, params: any) => {
    debugger
    const { scene, lightType }: any = window
    state.sceneLayer = scene.children.filter((item: any) => item.userData.fid && lightType.indexOf(item.type) === -1)
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
    const { THREE }: any = window

    // 设置名称
    state.geometry.name = params.name

    // 设置坐标
    state.geometry.position.x = params.position.x
    state.geometry.position.y = params.position.y
    state.geometry.position.z = params.position.z    

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
    }else{
      debugger
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
    

    // debugger
    // if(params.material.map){
    //   const win: any = window
    //   if(params.material.isMorePlane === '1'){
    //     material.map.forEach((item: any, index: any) => {
    //       new win.THREE.TextureLoader().load(item.image, (texture: any) => {
    //         state.geometry.material[index].map = texture
    //         state.geometry.material[index].map.needsUpdate = true
    //       })
    //     })
    //   }else{
        // for(let i = 0; i < state.geometry.material.length; i++){
        //   const TextureLoader = new win.THREE.TextureLoader()
        //   TextureLoader.load(material.image, (texture: any) => {
        //     state.geometry.material[i].map = texture
        //     state.geometry.material[i].map.needsUpdate = true
        //   })
        // }
    //   }
    // }

    // 设置Z轴旋转
    state.geometry.rotation.x = parseFloat(state.geometryInfo.rotation.x)
    state.geometry.rotation.y = parseFloat(state.geometryInfo.rotation.y)
    state.geometry.rotation.z = parseFloat(state.geometryInfo.rotation.z)

    const index = state.geometryList.findIndex((item: any) => item.uuid === state.geometryInfo.uuid)
    
    if(index !== -1){
      const aa = JSON.parse(JSON.stringify(state.geometryInfo))
      state.geometryList[index] = aa
    }
  },
  // 存储几何元素对象数据
  setGeometryInfo: (state: any, params: any) => {
    const { position, geometry: { parameters }, material } = params
    const { THREE }: any = window
    
    state.geometry = params
    
    // 如果是组，那么获取组对象上的数据
    let currentData = params
    if(params.parent.type === 'Group'){
      currentData = params.parent
    }

    // 平面没有多面，需要将 isMorePlane 设置成0
    if(currentData.type === 'PlaneGeometry'){
      currentData.userData.material.isMorePlane = '0'
    }

    state.geometryInfo.fid = currentData.userData.fid
    state.geometryInfo.uuid = currentData.uuid
    state.geometryInfo.name = currentData.name
    state.geometryInfo.type = currentData.geometry.type

    // 设置坐标
    state.geometryInfo.position = {
      x: parseInt(position.x),
      y: parseInt(position.y),
      z: parseInt(position.z),
    }
    
    // 设置参数
    state.geometryInfo.parameters = JSON.parse(JSON.stringify(state.geometry.geometry.parameters))

    // 统一设置时，原来的数据保持不变
    state.geometryInfo.material = currentData.userData.material
    
    // 统一设置
    if(currentData.userData.material.isMorePlane == '0'){
      // 颜色
      const color = new THREE.Color(material.color)
      const setColor = color.getHexString()
      state.geometryInfo.material.color = `#${setColor}`
      state.geometryInfo.material.image = params.material.map.source.data.currentSrc
    }else{
      let arr: any
      if(params.material instanceof Array){
        arr = params.material
      }else{
        arr = []
        for(let i = 0; i < 6; i++){
          arr.push(params.material.clone())
        }
      }

      arr.forEach((item: any, index: any) => {
        //颜色
        if(!item.color){
          const color = new THREE.Color(item.color)
          const setColor = color.getHexString()
          state.geometryInfo.material.map[index].color = `#${setColor}`
        }
        //图片
        if(!item.map.source.data.currentSrc){
          state.geometryInfo.material.map[index].image = item.map.source.data.currentSrc
        }
      })
      params.material = arr
    }
    
    // 动画设置
    state.geometryInfo.animation = state.geometry.userData.animation

    // 设置Z轴旋转
    state.geometryInfo.rotation.x = parseFloat(state.geometry.rotation.x)
    state.geometryInfo.rotation.y = parseFloat(state.geometry.rotation.y)
    state.geometryInfo.rotation.z = parseFloat(state.geometry.rotation.z)

    // 设置轨迹动画
    state.geometryInfo.roadLine = state.geometry.userData.roadLine

    // 事件设置
    state.geometryInfo.event.target = state.geometry.userData.event.target

    // 语音设置
    state.geometryInfo.voice = state.geometry.userData.voice

    // 文本设置
    state.geometryInfo.material.text = state.geometry.userData.material.text
    

    const index = state.geometryList.findIndex((item: any) => item.uuid === state.geometryInfo.uuid)
    if(index === -1){
      const aa = JSON.parse(JSON.stringify(state.geometryInfo))
      state.geometryList.push(aa)
    }
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
  },
  // 存储几何元素对象数据
  setLightInfo: (state: any, params: any) => {
    const { position } = params
    const { THREE }: any = window

    state.lightInfo.fid = params.userData.fid
    state.lightInfo.uuid = params.uuid
    state.lightInfo.name = params.name
    const color = new THREE.Color(params.color)
    const setColor = color.getHexString()
    state.lightInfo.color = `#${setColor}`

    state.lightInfo.intensity = params.intensity

    // 设置坐标
    state.lightInfo.position = {
      x: parseInt(position.x),
      y: parseInt(position.y),
      z: parseInt(position.z),
    }

    const index = state.lightList.findIndex((item: any) => item.uuid === state.lightInfo.uuid)

    if(index === -1){
      const aa = JSON.parse(JSON.stringify(state.lightInfo))
      state.lightList.push(aa)
    }
  },
  // 设置光源象数据
  setLight: (state: any, params: any) => {
    // const { position, parameters, material } = params
    const { THREE, scene }: any = window

    let light = scene.children.filter((item: any) => item.uuid === params.uuid)
    
    // 设置基本信息
    light[0].name = params.name
    light[0].color = new THREE.Color(params.color)
    light[0].intensity = params.intensity

    // 设置坐标
    light[0].x = params.position.x
    light[0].y = params.position.y
    light[0].z = params.position.z 

    const index = state.lightList.findIndex((item: any) => item.uuid === state.lightInfo.uuid)
    
    if(index !== -1){
      const aa = JSON.parse(JSON.stringify(state.lightInfo))
      state.lightList[index] = aa
    }
  },
  // 存储辅助对象数据
  setHelperInfo: (state: any, params: any) => {
    const { position } = params
    const { THREE }: any = window

    state.helperInfo.fid = params.userData.fid
    state.helperInfo.uuid = params.uuid
    state.helperInfo.name = params.name
    
    // 设置坐标
    state.helperInfo.position = {
      x: parseInt(position.x),
      y: parseInt(position.y),
      z: parseInt(position.z),
    }

    const index = state.helperList.findIndex((item: any) => item.uuid === state.helperInfo.uuid)

    if(index === -1){
      const aa = JSON.parse(JSON.stringify(state.helperInfo))
      state.helperList.push(aa)
    }
  },
  // 设置辅助象数据
  setHelper: (state: any, params: any) => {
    // const { position, parameters, material } = params
    const { THREE, scene }: any = window

    let light = scene.children.filter((item: any) => item.uuid === params.uuid)
    
    // 设置基本信息
    light[0].name = params.name
    light[0].color = new THREE.Color(params.color)
    light[0].intensity = params.intensity

    // 设置坐标
    light[0].x = params.position.x
    light[0].y = params.position.y
    light[0].z = params.position.z 

    const index = state.helperList.findIndex((item: any) => item.uuid === state.helperInfo.uuid)
    
    if(index !== -1){
      const aa = JSON.parse(JSON.stringify(state.helperInfo))
      state.helperList[index] = aa
    }
  }
}

export default mutations
