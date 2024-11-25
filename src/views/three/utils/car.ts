// 轿车
export const car = (params: any = {}) => {
  const {THREE, scene, createText, GLTFLoader, DRACOLoader, CSS2DObject, ThreeFn, store, roadLine, config} = params

  const bodyMaterial = new THREE.MeshPhysicalMaterial( {
    color: config.car_color || 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03
  } );

  const detailsMaterial = new THREE.MeshStandardMaterial( {
    color: 0xffffff, metalness: 1.0, roughness: 0.5
  } );

  const glassMaterial = new THREE.MeshPhysicalMaterial( {
    color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
  } );

  // Car

  const shadow = new THREE.TextureLoader().load( '/three/models/gltf/ferrari_ao.png' );

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( '/three/jsm/libs/draco/gltf/' );

  const loader = new GLTFLoader();
  loader.setDRACOLoader( dracoLoader );

  loader.load( '/three/models/gltf/ferrari.glb', function ( gltf: any ) {

    const carModel = gltf.scene.children[ 0 ];

    carModel.getObjectByName( 'body' ).material = bodyMaterial;

    carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
    carModel.getObjectByName( 'trim' ).material = detailsMaterial;

    carModel.getObjectByName( 'glass' ).material = glassMaterial;

    carModel.wheels = []
    carModel.wheels.push(
      carModel.getObjectByName( 'wheel_fl' ),
      carModel.getObjectByName( 'wheel_fr' ),
      carModel.getObjectByName( 'wheel_rl' ),
      carModel.getObjectByName( 'wheel_rr' )
    );

    // shadow
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
      new THREE.MeshBasicMaterial( {
        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
      } )
    );
    mesh.rotation.x = - Math.PI / 2;
    mesh.renderOrder = 2;
    carModel.scale.set(10, 10, 10)
    carModel.add( mesh );

    // 

    const span: any = document.createElement('div')
    span.classList = "userName"
    span.textContent = carModel.userData.name
    span.style.display = "inline-block"
    document.body.appendChild(span)
    
    const moonMassDiv = document.createElement( 'div' );
    moonMassDiv.className = 'label';
    moonMassDiv.innerHTML = `<div class="driver"><div>${carModel.userData.name}</div><div class="photos"><img src='/images/music.png' /></div></div>`;
    moonMassDiv.style.backgroundColor = 'transparent';

    if(span.clientWidth > 25){
      moonMassDiv.style.marginLeft = `-${(span.clientWidth-25)/2+13}px`;
    }
    span.remove()

    const moonMassLabel = new CSS2DObject( moonMassDiv );
    
    moonMassLabel.position.y = 5;
    moonMassLabel.center.set( 0, 0 );
    carModel.add( moonMassLabel );
    moonMassLabel.layers.set( 0 );



    store.commit('three/setAddCar', carModel)
    carModel.position.y = 1

    // 自定义参数
    carModel.userData.roadLine = roadLine
    
    scene.add( carModel );
    ThreeFn.roadLine({
      THREE,
      scene,
      model: carModel,
      ...roadLine,
    })
  });
}

// 特写
export const closeUp = (params: any = {}) => {
  const { currentCar, modelType, keys } = params
  
  document.addEventListener('keydown', (e: any) => {
    const  car = currentCar.value
    if(e.keyCode === 81){
      const index = modelType.indexOf(car.modelType)
      if(index === 5){
        car.modelType = modelType[0]
      }else{
        car.modelType = modelType[index+1]
      }
      closeUps(params)      
    }
    // 推出特写模式
    if(e.keyCode === 27){
      car.modelType = null
    }

    switch(e.keyCode){
      // 上
      case 38 :
        keys.top = true
        break;
      // 右
      case 39 :
        keys.right = true
        break;
      // 下
      case 40 :
        keys.bottom = true
        break;
      // 左
      case 37 :
        keys.left = true 
        break;
    }
  })

  document.addEventListener('keyup', (e: any) => {
    const  car = currentCar.value
    
    switch(e.keyCode){
      // 上
      case 38 :
        keys.top = false
        break;
      // 右
      case 39 :
        keys.right = false
        break;
      // 下
      case 40 :
        keys.bottom = false
        break;
      // 左
      case 37 :
        keys.left = false 
        break;
    }
  })

  setInterval(() => {
    if(keys.top){
      carRun({
        ...params,
        arrow: 'head'
      })
    }
    if(keys.bottom){
      carRun({
        ...params,
        arrow: 'back'
      })
    }
    if(keys.left){
      carRun({
        ...params,
        arrow: 'left'
      })
    }
    if(keys.right){
      carRun({
        ...params,
        arrow: 'right'
      })
    }
  }, 10)
}

// 车辆行驶
export const carRun = (params: any = {}) => {
  const { camera, currentCar, modelType, arrow } = params

  const car = currentCar.value
  
  if(arrow === 'head'){
    car.position.x += 1
  }
}

// 特写
export const closeUps = (params: any = {}) => {
  const { camera, currentCar, point = {}, pointBox = {} } = params

  const car = currentCar.value
  console.log("汽车坐标"+JSON.stringify(car.position));
  console.log("目标坐标"+JSON.stringify(pointBox));

  // // 斜率
  // let k = (pointBox.z-car.position.z)/(pointBox.x-car.position.x)
  // // console.log("斜率"+k)

  // // 目标与车的距离
  // let b = pointBox.z-k*pointBox.x

  // let y = k*car.position.x+100
  // console.log("Y坐标"+y)

  switch(car.modelType){
    // 默认
    case 'default' :
      camera.position.set(0, 250, 635)
      camera.lookAt(0, 0, 0)
      break;
    // 后面
    case 'back' :
      camera.position.set(pointBox.x || car.position.x, 100, pointBox.z || car.position.z)
      camera.lookAt(car.position.x || 0, point.y || 0, car.position.z || 0)
      break;
    // 左侧
    case 'left' :
      camera.position.set(point.x|| car.position.x, 25, point.z || car.position.z)
      camera.lookAt(point.x || 0, point.y || 0, point.z || 0)
      break;
    // 前面
    case 'head' :
      camera.position.set(0, 25, -100)
      camera.lookAt(0, 0, 0)
      break;
    // 右侧
    case 'right' :
      camera.position.set(100, 25, 0)
      camera.lookAt(0, 0, 0)
      break;
    // 顶部
    case 'top' :
      camera.position.set(0, 75, 0)
      camera.lookAt(0, 0, 0)
      break;
  }
}

// 特写动画
export const closeUpAnimate = (params: any = {}) => {
  const { camera, currentCar, modelType, keys, obj } = params

  if (parseInt(camera.position.x) != obj.end.x) {

    if (obj.start.x > obj.end.x) {
      camera.position.x -= 1
    } else {
      camera.position.x += 1
    }
  }



  if (parseInt(camera.position.y) != obj.end.y) {

    if (obj.start.y > obj.end.y) {
      camera.position.y -= 1
    } else {
      camera.position.y += 1
    }
  }


  if (parseInt(camera.position.z) != obj.end.z) {

    if (obj.start.z > obj.end.z) {
      camera.position.z -= 1
    } else {
      camera.position.z += 1
    }
  }


  if (parseInt(camera.position.x) == obj.end.x && parseInt(camera.position.y) == obj.end.y && parseInt(camera.position.z) == obj.end.z) {
    // 注释
  } else {
    requestAnimationFrame(closeUpAnimate.bind(null, params));
  }
  camera.lookAt(obj.end.x, 0, 0)
}
