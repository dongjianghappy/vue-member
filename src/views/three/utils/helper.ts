import { helperInfo } from "@/views/three/utils/data/geometry";

// 坐标格辅助
export const GridHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...helperInfo }
    initData.fid = params.data.id
    initData.parameters = {
      size: 1000,
      divisions: 10
    }
    params.data = initData
  }
  
  const { parameters } = params.data
  const gridHelper = new THREE.GridHelper( parameters.size, parameters.divisions );
  
  gridHelper.userData = params.data
  scene.add( gridHelper );
  ThreeFn && ThreeFn.customizeItem(params, gridHelper)
}

// 模拟3个坐标轴 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
export const AxesHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...helperInfo }
    initData.fid = params.data.id
    initData.parameters = {
      size: 1000
    }
    params.data = initData
  }
  
  const { parameters } = params.data
  const axesHelper = new THREE.AxesHelper( parameters.size );
  axesHelper.userData = params.data
  scene.add( axesHelper );
  ThreeFn && ThreeFn.customizeItem(params, axesHelper)
}

// 
export const BoxHelper = (params: any = {}) => {
  const { THREE, scene, ThreeFn }: any = params

  // 新增时，设置userData数据
  if(!params.actionType){
    const initData = { ...helperInfo }
    initData.fid = params.data.id
    initData.parameters = {
      size: 1000
    }
    params.data = initData
  }
  
  const { parameters } = params.data

  const sphere = new THREE.SphereGeometry();
  const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
  const box = new THREE.BoxHelper( object, 0xffff00 );

  box.userData = params.data
  scene.add( box );
  ThreeFn && ThreeFn.customizeItem(params, box)
}