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
    
    let stateName = 'geometryInfo'
    if(three3DType['helper'].indexOf(state.geometry.type) > -1){
      stateName = 'helperInfo'
    }else if(three3DType['light'].indexOf(params.type) > -1){
      stateName = 'lightInfo'
    }

    // 设置宽高
    let x, y, z
    // 元素设置
    if(geometryType.indexOf(state.geometry.geometry.type) > -1){
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
    }else if(state.geometry.type === 'GridHelper'){
      // 网格, 先删除再重新创建
      scene.children = scene.children.filter((item: any) => item.uuid !== state.geometry.uuid)
      ThreeFn.GridHelper({
        THREE,
        scene,
        ThreeFn,
        actionType: 'render',
        size: params.parameters.size,
        divisions: params.parameters.divisions,
        data: {
          content: params
        }
      })
    }
    else if(state.geometry.type === 'AxesHelper'){
      // 坐标轴, 先删除再重新创建
      scene.children = scene.children.filter((item: any) => item.uuid !== state.geometry.uuid)
      ThreeFn.AxesHelper({
        THREE,
        scene,
        ThreeFn,
        actionType: 'render',
        size: params.parameters.size,
        data: {
          content: params
        }
      })
    }
    // 灯光设置
    else if(three3DType['light'].indexOf(state.geometry.type) > -1){
      switch(state.geometry.type){
        case 'AmbientLight, DirectionalLight, LightProbe' :
          state.geometry.color = new THREE.Color(params.parameters.color)
          state.geometry.intensity = params.parameters.intensity

        break
        case 'HemisphereLight' :
          state.geometry.color = new THREE.Color(params.parameters.color)
          state.geometry.groundColor = new THREE.Color(params.parameters.groundColor)
          state.geometry.intensity = params.parameters.intensity
        break
        case 'PointLight' :
          state.geometry.color = new THREE.Color(params.parameters.color)
          state.geometry.groundColor = new THREE.Color(params.parameters.groundColor)
          state.geometry.intensity = params.parameters.intensity
          state.geometry.distance = params.parameters.distance
          state.geometry.decay = params.parameters.decay
        break
        case 'RectAreaLight' :
          state.geometry.color = new THREE.Color(params.parameters.color)
          state.geometry.intensity = params.parameters.intensity
          state.geometry.width = params.parameters.width
          state.geometry.height = params.parameters.height
        break
        case 'SpotLight' :
          state.geometry.color = new THREE.Color(params.parameters.color)
          state.geometry.intensity = params.parameters.intensity
          state.geometry.distance = params.parameters.distance
          state.geometry.angle = params.parameters.angle
          state.geometry.penumbra = params.parameters.penumbra
          state.geometry.decay = params.parameters.decay
        break
      }
    }

    // 注意，所有元素更新需要在下面这里赋值，因为有些物体是先删除再创建，这两个不是同一个对象
    // 设置名称
    state.geometry.name = params.name

    // 设置坐标
    state.geometry.position.x = params.position.x
    state.geometry.position.y = params.position.y
    state.geometry.position.z = params.position.z  

    // 几何类型设置
    if(geometryType.indexOf(state.geometry.geometry.type) > -1){
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
    state.geometry.rotation.x = parseFloat(state[stateName].rotation.x)
    state.geometry.rotation.y = parseFloat(state[stateName].rotation.y)
    state.geometry.rotation.z = parseFloat(state[stateName].rotation.z)
    state[stateName].isEdit = true // 标记对象更改过
    state.geometry.userData = state[stateName]
  },
  // 场景元素对象数据存储
  setGeometryInfo: (state: any, params: any) => {
    const { position, material } = params
    const { THREE }: any = window

    let stateName = 'geometryInfo'
    if(three3DType['helper'].indexOf(params.type) > -1){
      stateName = 'helperInfo'
    }else if(three3DType['light'].indexOf(params.type) > -1){
      stateName = 'lightInfo'
    }
    
    state.geometry = params

    if(!params.geometry){
      params.geometry = {}
    }
    if(!params.parent){
      params.parent = {}
    }
    
    // 如果是组，那么获取组对象上的数据
    let parentData = params
    if(params.parent.type === 'Group'){
      parentData = params.parent
    }
    debugger
    state[stateName].fid = parentData.userData.fid
    state[stateName].uuid = parentData.uuid
    state[stateName].name = parentData.name
    state[stateName].type = parentData.type !== 'Mesh' ? parentData.type : parentData.geometry.type
    
    // 设置材质，原来的数据保持不变
    state[stateName].material && (state[stateName].material = parentData.userData.material)

    // 几何类型设置
    if(geometryType.indexOf(parentData.geometry.type) > -1){
      // 设置初始化参数
      state[stateName].parameters = JSON.parse(JSON.stringify(state.geometry.geometry.parameters))

      // 统一设置
      if(parentData.userData.material.isMorePlane == '0'){
        // 颜色
        const color = new THREE.Color(material.color)
        const setColor = color.getHexString()
        state[stateName].material.color = `#${setColor}`
        if(params.material.map && params.material.map.source.data){
          state[stateName].material.image = params.material.map.source.data.currentSrc
        }
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
            state[stateName].material.map[index].color = `#${setColor}`
          }
          //图片
          if(item.map && item.map.source.data){
            state[stateName].material.map[index].image = item.map.source.data.currentSrc
          }
        })
        params.material = arr
      }

      // 设置轨迹动画
      state[stateName].roadLine = state.geometry.userData.roadLine

      // 事件设置
      state[stateName].event.target = state.geometry.userData.event.target

      // 语音设置
      state[stateName].voice = state.geometry.userData.voice

      // 文本设置
      state[stateName].material.text = state.geometry.userData.material.text
    }else{
      // 设置初始化参数
      state[stateName].parameters = JSON.parse(JSON.stringify(state.geometry.userData.parameters))
    }

    // 灯光设置
    if(three3DType['light'].indexOf(state.geometry.type) > -1){
      let setColor
      switch(state.geometry.type){
        case 'AmbientLight, DirectionalLight, LightProbe' :
          setColor = new THREE.Color(params.color).getHexString()
          state[stateName].parameters.color = `#${setColor}`
          state[stateName].parameters.intensity = params.intensity
        break
        case 'HemisphereLight' :
          let skyColor: any = new THREE.Color(params.color).getHexString()
          state[stateName].parameters.color = `#${skyColor}`

          let groundColor: any = new THREE.Color(params.groundColor).getHexString()
          state[stateName].parameters.groundColor = `#${groundColor}`
          state[stateName].intensity = params.intensity
        break
        case 'PointLight' :
          setColor = new THREE.Color(params.color).getHexString()
          state[stateName].parameters.color = `#${setColor}`
          state[stateName].parameters.intensity = params.intensity
          state[stateName].parameters.distance = params.distance
          state[stateName].parameters.decay = params.decay
        break
        case 'RectAreaLight' :
          setColor = new THREE.Color(params.color).getHexString()
          state[stateName].parameters.color = `#${setColor}`
          state[stateName].parameters.intensity = params.intensity
          state[stateName].parameters.width = params.width
          state[stateName].parameters.height = params.height
        break
        case 'SpotLight' :
          setColor = new THREE.Color(params.color).getHexString()
          state[stateName].parameters.color = `#${setColor}`
          state[stateName].parameters.intensity = params.intensity
          state[stateName].parameters.distance = params.distance
          state[stateName].parameters.angle = params.angle
          state[stateName].parameters.penumbra = params.penumbra
          state[stateName].parameters.decay = params.decay
        break
      }
    }
    
    // 设置坐标
    state[stateName].position = {
      x: parseInt(position.x),
      y: parseInt(position.y),
      z: parseInt(position.z),
    }

    // 设置Z轴旋转
    state[stateName].rotation.x = parseFloat(state.geometry.rotation.x)
    state[stateName].rotation.y = parseFloat(state.geometry.rotation.y)
    state[stateName].rotation.z = parseFloat(state.geometry.rotation.z)

    // 动画设置
    state[stateName].animation && (state[stateName].animation = state.geometry.userData.animation)
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
