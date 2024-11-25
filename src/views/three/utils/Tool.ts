// 文本
export const textTool = (params: any = {}, item: any) => {

  const { ThreeFn, THREE, scene, store} = params

  let text = "文本"
  let color = '#ffff00'
  let size = 24
  let position: any = {
    x: 0,
    y: 0,
    z: 0
  }
  
  const exitButtonText2 = params.createText(text, size);
  exitButtonText2.position.set(parseInt(position.x), parseInt(position.y), parseInt(position.z));

  exitButtonText2.material.color = new THREE.Color(color)
  exitButtonText2.kind = 'text'
  exitButtonText2.userData = store.state.three.textInfo
  scene.add(exitButtonText2);
  store.commit('three/setSceneLayer')
  ThreeFn && ThreeFn.customizeItem(params, exitButtonText2)
}