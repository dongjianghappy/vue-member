// 坐标格辅助
export const GridHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  let size = 10, divisions = 10
  if(params.data && params.data.content){
    size = params.data.content.parameters.size
    divisions = params.data.content.parameters.divisions
  }

  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );
  gridHelper.userData.parameters = {
    size,
    divisions
  }
  ThreeFn && ThreeFn.customizeItem(params, gridHelper)
}

// 模拟3个坐标轴 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
export const AxesHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  let size = 250
  if(params.data && params.data.content){
    size = params.data.content.parameters.size
  }

  const axesHelper = new THREE.AxesHelper( size );
  scene.add( axesHelper );
  axesHelper.userData.parameters = {
    size
  }
  ThreeFn && ThreeFn.customizeItem(params, axesHelper)
}

// 
export const BoxHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  let size = 250
  if(params.data && params.data.content){
    size = params.data.content.parameters.size
  }

  const sphere = new THREE.SphereGeometry();
  const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
  const box = new THREE.BoxHelper( object, 0xffff00 );
  scene.add( box );

  box.userData.parameters = {
    size
  }
  ThreeFn && ThreeFn.customizeItem(params, box)
}