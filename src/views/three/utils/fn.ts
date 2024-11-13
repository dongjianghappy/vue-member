// 拓展物体事件
export const dragItem = (params: any = {}) => {
  const { THREE, scene, camera, renderer, DragControls, ThreeFn, store, _control, position, width = 1, height = 50, color = 0x4c4b4a, rotateZ } = params

  let modelX = 0;//x轴位置
  let modelY = 0;//y轴位置
  
  const dragControls: any = new DragControls([params.item], camera, renderer.domElement)
  ThreeFn.control.enableRotate = false
  ThreeFn.control.enableZoom = false

//拖拽开始前记录此时模型位置
dragControls.addEventListener( 'dragstart', function ( event: any ) {
  modelX = event.object.position.x
  modelY = event.object.position.y
  ThreeFn.control.enableRotate = false
  ThreeFn.control.enableZoom = false
  });
  
  //拖拽时重置x和y轴位置，并判断z轴是否在范围内，如果不在则设置回范围内的位置
  dragControls.addEventListener( 'drag', function ( event: any ) {
    let x = document.getElementsByClassName('position-x')
    let y = document.getElementsByClassName('position-y')
    let z = document.getElementsByClassName('position-z')

    x[0].innerHTML = params.item.position.x
    z[0].innerHTML = params.item.position.z
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
  const { ThreeFn } = params

  if(ThreeFn){    
    if(params.actionType === 'render'){
      item.uuid = params.data.content.uuid
      
      item.position.x = params.data.content.position.x
      item.position.y = params.data.content.position.y
      item.position.z = params.data.content.position.z
    }
    item.userData.fid = params.data.id
    ThreeFn.dragItem({...params, item})
  }
}