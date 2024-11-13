const mutations = {
  setCurrentScene: (state: any, params: any) => {
    state.currentScene = params
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
  setGeometry: (state: any, params: any) => {
    const { position, parameters, material } = params

    // 设置坐标
    state.geometry.position.x = params.position.x
    state.geometry.position.y = params.position.y
    state.geometry.position.z = params.position.z    

    // 设置宽高
    let x = parseInt(parameters.width) / state.geometry.geometry.parameters.width
    let z = parseInt(parameters.height) / state.geometry.geometry.parameters.height
    state.geometry.scale.set(x, z, 1)

    // 设置颜色
    const { THREE }: any = window
    let color = new THREE.Color(material.color)
    state.geometry.material.color = color

    // 设置Z轴旋转
    state.geometry.rotation.z = state.geometryInfo.rotation.z

    let index = state.geometryList.findIndex((item: any) => item.uuid === state.geometryInfo.uuid)
    
    if(index !== -1){
      let aa = JSON.parse(JSON.stringify(state.geometryInfo))
      state.geometryList[index] = aa
    }
  },
  setGeometryInfo: (state: any, params: any) => {
    state.geometry = params
    
    const { position, geometry: { parameters }, material } = params

    state.geometryInfo.uuid = params.parent.type === 'Group' ? params.parent.uuid :  params.uuid
    state.geometryInfo.fid = params.userData.fid || params.parent.userData.fid

    // 设置坐标
    state.geometryInfo.position = {
      x: parseInt(position.x),
      y: parseInt(position.y),
      z: parseInt(position.z),
    }

    // 设置宽高
    let w: any = state.geometry.scale.x * state.geometry.geometry.parameters.width
    let h: any = state.geometry.scale.y * state.geometry.geometry.parameters.height
    state.geometryInfo.parameters = {
      width: parseInt(w),
      height: parseInt(h)
    }

    // 设置颜色
    const { THREE }: any = window
    let color = new THREE.Color(material.color)
    let setColor = color.getHexString()
    state.geometryInfo.material.color = `#${setColor}`

    // 设置Z轴旋转
    state.geometryInfo.rotation.z = state.geometry.rotation.z

    let index = state.geometryList.findIndex((item: any) => item.uuid === state.geometryInfo.uuid)
    if(index === -1){
      let aa = JSON.parse(JSON.stringify(state.geometryInfo))
      state.geometryList.push(aa)
    }
  }
}

export default mutations
