import { render } from "vue";

// 传送门
export const door = (params: any = {}) => {
  const { THREE, scene, camera, renderer, DragControls, store, _control, position, width = 1, height = 50, color = 0x4c4b4a, rotateZ } = params

//   let modelX = 0;//x轴位置
//   let modelY = 0;//y轴位置

//   const geometry = new THREE.PlaneGeometry( 100, 100 );
//   const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
//   const circle = new THREE.Mesh( geometry, material );
//   circle.rotateX(1.5721)
//   circle.position.y = 5
//   circle.position.x = position.x
//   circle.position.z = position.z
//   scene.add( circle );

//   const dragControls: any = new DragControls([circle], camera, renderer.domElement)

// //拖拽开始前记录此时模型位置
// dragControls.addEventListener( 'dragstart', function ( event: any ) {
//   store.commit('three/setGeometryInfo', event.object)
//   modelX = event.object.position.x
//   modelY = event.object.position.y
//   console.log("拖动前"+modelX+","+modelY)
//   _control.enableRotate = false
//   _control.enableZoom = false
//   });
  
//   //拖拽时重置x和y轴位置，并判断z轴是否在范围内，如果不在则设置回范围内的位置
//   dragControls.addEventListener( 'drag', function ( event: any ) {
//     let x = document.getElementsByClassName('position-x')
//     let y = document.getElementsByClassName('position-y')
//     let z = document.getElementsByClassName('position-z')

//     x[0].innerHTML = circle.position.x
//     z[0].innerHTML = circle.position.z
//     event.object.position.set(event.object.position.x, modelY, event.object.position.z)
//     store.commit('three/setGeometryInfo', event.object)
//   });
  
//   dragControls.addEventListener( 'dragend', function ( event: any ) {
//     _control.enableRotate = true
//     _control.enableZoom = true
//     store.commit('three/setGeometryInfo', event.object)
//   });
}



export const testplane =  (params: any) => {
  const { THREE, scene, camera, renderer, DragControls, store, _control, position, width = 1, height = 50, color = 0x4c4b4a, rotateZ } = params

//   let modelX = 0;//x轴位置
//   let modelY = 0;//y轴位置

//   const geometry = new THREE.PlaneGeometry( 100, 100 );
//   const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
//   const circle = new THREE.Mesh( geometry, material );
//   circle.rotateX(1.5721)
//   circle.position.y = 5
//   circle.position.x = 0
//   circle.position.z = 0
//   scene.add( circle );

//   const dragControls: any = new DragControls([circle], camera, renderer.domElement)

// //拖拽开始前记录此时模型位置
// dragControls.addEventListener( 'dragstart', function ( event: any ) {
//   modelX = event.object.position.x
//   modelY = event.object.position.y
//   console.log("拖动前"+modelX+","+modelY)
//   _control.enableRotate = false
//   _control.enableZoom = false
//   });
  
//   //拖拽时重置x和y轴位置，并判断z轴是否在范围内，如果不在则设置回范围内的位置
//   dragControls.addEventListener( 'drag', function ( event: any ) {
//     let x = document.getElementsByClassName('position-x')
//     let y = document.getElementsByClassName('position-y')
//     let z = document.getElementsByClassName('position-z')

//     x[0].innerHTML = circle.position.x
//     z[0].innerHTML = circle.position.z
//     event.object.position.set(event.object.position.x, modelY, event.object.position.z)
//   });
  
//   dragControls.addEventListener( 'dragend', function ( event: any ) {
//     _control.enableRotate = true
//     _control.enableZoom = true
//   });
}