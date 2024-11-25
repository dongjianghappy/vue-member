import { geometryType, three3DType } from "@/assets/threeConst"

// 拓展物体事件
export const dragItem = (params: any = {}) => {
  const { THREE, scene, camera, renderer, DragControls, ThreeFn, store, _control, position, width = 1, height = 50, color = 0x4c4b4a, rotateZ } = params

  let modelX = 0;//x轴位置
  let modelY = 0;//y轴位置
  
  const dragControls: any = new DragControls([params.item], camera, renderer.domElement)

//拖拽开始前记录此时模型位置
dragControls.addEventListener( 'dragstart', function ( event: any ) {
  modelX = event.object.position.x
  modelY = event.object.position.y
  ThreeFn.control.enableRotate = false
  ThreeFn.control.enableZoom = false
  store.commit('three/setCurrentEdit', "item")
  });
  
  //拖拽时重置x和y轴位置，并判断z轴是否在范围内，如果不在则设置回范围内的位置
  dragControls.addEventListener( 'drag', function ( event: any ) {
    event.object.position.set(event.object.position.x, modelY, event.object.position.z)
    store.commit('three/setGeometryInfo', event.object)
  });
  
  dragControls.addEventListener( 'dragend', function ( event: any ) {
    ThreeFn.control.enableRotate = true
    ThreeFn.control.enableZoom = true
    store.commit('three/setGeometryInfo', event.object)
  });
}

// 自定义物体元素
export const customizeItem = (params: any = {}, item: any) => {
  // const { THREE, scene, ThreeFn, lightType, store } = params
  const { THREE, scene, ThreeFn, store }: any = window

  if(ThreeFn){ 

    // 渲染
    if(params.actionType === 'render'){
      item.userData = {...params.data.content}
      item.uuid = params.data.content.uuid
      item.name = params.data.content.name

      item.position.x = params.data.content.position.x
      item.position.y = params.data.content.position.y
      item.position.z = params.data.content.position.z

      item.rotation.x = params.data.content.rotation.x
      item.rotation.y = params.data.content.rotation.y
      item.rotation.z = params.data.content.rotation.z
      item.visible = params.data.content.visible
    }
    // 复制
    else if(params.actionType === 'copy'){
      item.userData = params.data.content
      item.name = "副本-"+ params.data.content.name
    }
    // 新建
    else{
      item.name = "新建图层"
      
    }
    debugger
    // 灯光
    if(three3DType['light'].indexOf(item.type) !== -1){
      if(params.actionType !== 'render'){
        item.userData = store.state.three.lightInfo
        item.userData.fid = params.data.id
      }
      store.commit('three/setSceneLayer')
      store.commit('three/setGeometryInfo', item)
    }
    // 辅助
    else if(three3DType['helper'].indexOf(item.type) !== -1){
      if(params.actionType !== 'render'){
        item.userData = { ...store.state.three.helperInfo, ...item.userData}
        item.userData.fid = params.data.id
      }
      store.commit('three/setSceneLayer')
    }else{
      item.kind = 'wuti'
      if(params.actionType === 'render'){
        ThreeFn.createText(params, item)
      }else{
        item.userData = store.state.three.geometryInfo
        item.userData.fid = params.data.id
      }
      store.commit('three/setSceneLayer')
      store.commit('three/setGeometryInfo', item)
    }
 
    return
    // 灯光
    // if(lightType.indexOf(item.type) !== -1){
      // if(params.actionType === 'render'){
      //   item.userData = params.data.content
      //   item.uuid = params.data.content.uuid
      //   item.name = params.data.content.name

      //   item.position.x = params.data.content.position.x
      //   item.position.y = params.data.content.position.y
      //   item.position.z = params.data.content.position.z
      // }
      // else if(params.actionType === 'copy'){
      //   item.userData = params.data.content
      //   item.name = "副本-"+ params.data.content.name
      // }
      // else{
      //   // 初始化数据结构
      //   item.userData = store.state.three.lightInfo
      //   item.name = "新建图层"
      //   item.userData.fid = params.data.id
      // }
      // store.commit('three/setLayer')
    // }
    // 辅助
    // else if(lightType.indexOf('GridHelper') !== -1){
      // if(params.actionType === 'render'){
      //   item.userData = params.data.content
      //   item.uuid = params.data.content.uuid
      //   item.name = params.data.content.name

      //   item.position.x = params.data.content.position.x
      //   item.position.y = params.data.content.position.y
      //   item.position.z = params.data.content.position.z
      // }
      // else if(params.actionType === 'copy'){
      //   item.userData = params.data.content
      //   item.name = "副本-"+ params.data.content.name
      // }
      // else{
      //   // 初始化数据结构
      //   item.userData = store.state.three.lightInfo
      //   item.name = "新建图层"
      //   item.userData.fid = params.data.id
      // }
      // store.commit('three/setLayer')
    // }
    // else{
    //   item.kind = 'wuti'
    //   debugger  
    //   if(params.actionType === 'render'){
    //     item.userData = params.data.content
    //     item.uuid = params.data.content.uuid
    //     item.name = params.data.content.name
        
    //     item.position.x = params.data.content.position.x
    //     item.position.y = params.data.content.position.y
    //     item.position.z = params.data.content.position.z

    //     item.rotation.x = params.data.content.rotation.x
    //     item.rotation.y = params.data.content.rotation.y
    //     item.rotation.z = params.data.content.rotation.z
  
    //     ThreeFn.createText(params, item)
    //   }
    //   else if(params.actionType === 'copy'){
    //     item.userData = params.data.content
    //     item.name = "副本-"+ params.data.content.name
    //   }
    //   else{
    //     // 初始化数据结构
    //     item.userData = store.state.three.geometryInfo
    //     item.name = "新建图层"
    //     item.userData.fid = params.data.id
    //   }
    //   console.log("vvvvvvvvvvvvsssssssssss");
      
    //   // store.commit('three/setGeometryInfo', item)
    //   store.commit('three/setSceneLayer')
      ThreeFn.dragItem({...params, item})
  
      if(params.actionType !== 'render' && params.actionType !== 'copy'){
        return
      }
  
      let trackLine = store.state.three.trackLine.filter((item: any) => item.id === params.data.content.roadLine.id)
      ThreeFn.roadLine({
        THREE,
        scene,
        model: item,
        points: trackLine[0] && trackLine[0].points || [],
        ...params.data.content.roadLine,
      })    
  }
}

// 设置物体颜色和图片
export const setMaterialColor = (params: any) => {

  const { THREE }: any = window
  const color = new THREE.Color(params)
  return color.getHexString()
}

// 图片加载结果处理
export const TextureLoader = (params: any) => {
  const { THREE, materialArray, count, image, color }: any = params
debugger
  let material
  new THREE.TextureLoader().load(image,
    (texture: any) => { 
      material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, color})
      alert(materialArray)
      if(materialArray instanceof Array){
        materialArray.push(material)
        if(materialArray.length == count){
          alert("vvv")
          params.Mesh(material)
        }
      }else{
        params.Mesh(material)
      }
    },
    undefined,
    () => { 
      material = new THREE.MeshBasicMaterial( { color } );
      if(materialArray instanceof Array){
        materialArray.push(material)
        if(materialArray.length == count){
          params.Mesh(material)
        }
      }else{
        params.Mesh(material)
      }
    }
  )
}
