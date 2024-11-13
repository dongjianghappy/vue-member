// 控制器
export const control = (params: any = {}) => {
  
  const {camera, renderer, OrbitControls } = params
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 0.01;
  // controls.maxDistance = 200;
  // controls.maxPolarAngle = 0.4 * Math.PI;
  return controls
}

// 星空
export const starKay = (params: any = {}) => {

  const { THREE, scene, config: { star } }: any = params
  const stars = parseInt(star.star_count) || 10000
  const vertices = [];

  for ( let i = 0; i < stars; i ++ ) {
    let x = THREE.MathUtils.randFloatSpread( 2000 );
    let y = THREE.MathUtils.randFloatSpread( 2000 );
    let z = THREE.MathUtils.randFloatSpread( 2000 );
  
    let x1 = x > -500 && x < 500
    let y1 = y > -500 && y < 500
    let z1 = z > -800 && z < 800

    if(!(x1 && y1 && z1)){
      vertices.push( x, y, z );
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  const material = new THREE.PointsMaterial( { color: 0xffffffff } );
  const points = new THREE.Points( geometry, material );
  scene.add( points );
}

// 用户星球
export const userStar = (params: any = {}) => {

  const {THREE, scene, store, config: { planet }, userList } = params
  const planets = parseInt(planet.planet_count) || 100
  const geometry = new THREE.SphereGeometry( 32, 32, 32 );
  
  for (let i = 0; i < planets; i++) {
		// const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
		
    let material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/images/1.jpg') , side: THREE.DoubleSide, color: planet.color || '#fff'})
    const sphere = new THREE.Mesh( geometry, material );
    sphere.material.map.wrapS = THREE.RepeatWrapping;
    sphere.material.map.wrapT = THREE.RepeatWrapping;
    sphere.material.map.encoding = THREE.sRGBEncoding;
    
    let x = THREE.MathUtils.randFloatSpread(2000)
    let y = THREE.MathUtils.randFloatSpread(2000)
    let z = THREE.MathUtils.randFloatSpread(2000)

    let x1 = x > -500 && x < 500
    let y1 = y > -500 && y < 500
    let z1 = z > -800 && z < 800

    if(!(x1 && y1 && z1)){
      sphere.position.set(x, y, z);
      store.commit('three/setAddStar', sphere)
      
      sphere.userData = {
        ...userList[i],
        kind: 'star'
      }
      scene.add( sphere );
    }
  }

}

// 网格
export const gridHelper = (params: any = {}) => {
  const {THREE, scene, size = 600, divisions = 10 } = params
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );
}

// 平面
export const plane = (params: any = {}) => {
  const { config, THREE, scene, size = 1200, divisions = 1500 } = params
  const geometry = new THREE.PlaneGeometry( size, divisions );
  // const material = new THREE.MeshPhongMaterial( {color: 0x999999, side: THREE.DoubleSide} );
  const material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/images/2.jpg') , side: THREE.DoubleSide, color:'#fff'})
  const plane = new THREE.Mesh( geometry, material );
  plane.material.map.wrapS = THREE.RepeatWrapping;
  plane.material.map.wrapT = THREE.RepeatWrapping;
  plane.material.map.encoding = THREE.sRGBEncoding;
  plane.material.map.flipY = false
  plane.rotateX(1.5721)

  spaceName(params)
  
  scene.add( plane );
}

// 灯光
export const light = (params: any = {}) => {
  const {THREE, scene} = params

  // 环境光
  const ambientLight = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
  scene.add( ambientLight );

  // 平行光
// 从上方照射的白色平行光，强度为 0.5。
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add( directionalLight );

  // 聚光灯
  const pointLight = new THREE.PointLight( 0xff0000, 1, 10000 );
  pointLight.position.set( 50, 50, 50 );
  // scene.add( pointLight );
}

// 空间名称
export const spaceName = (params: any = {}) => {

  const {config, THREE, scene, createText} = params
  const exitButtonText2 = createText(config.name, 120);
  exitButtonText2.position.set(0, 250, -800);
  exitButtonText2.material.color = {
    r: 255,
    g: 255,
    b: 0
  }
  scene.add(exitButtonText2);
}

// 物体点击事件方法
export const geometryEvent = (params: any) => {
  const { THREE, scene, camera, handleBroadcast } = params
  const raycaster = new THREE.Raycaster()
  // 鼠标控制对象
  const mouse = new THREE.Vector2();
  const arrGroup: any = []

  function aaa(event: any){
    event.preventDefault();

    // 得到鼠标相对于容器的坐标
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // 执行射线检测
    raycaster.setFromCamera(mouse, camera);
    // 判断指定的对象中哪些被该光线照射到了，在arrGroup中筛选
    const intersects = raycaster.intersectObjects(scene.children, true)
    // const intersects = raycaster.intersectObjects(scene.children)
    // 射线涉及到的物体集合
    console.log('intersects:', intersects)

    if (intersects.length > 0) {
        const obj = intersects[0].object
        if(obj.userData.kind === 'star'){
          handleBroadcast(`您将搭载博客001号飞船前往${obj.userData.nickname}星球，祝您太空旅途愉快`)
          params.goUserStar()
        }
        if(obj.userData.kind === 'send'){
          handleBroadcast("正在前往ADC赛车比赛现场")
          params.goBisaiScene()
        }
        if(obj.userData.kind === 'home'){
          handleBroadcast("正在前往星球家园")
          params.goHomeScene()
        }
    }
  }

  document.addEventListener('click', aaa)
  // document.removeEventListener('click', aaa)
}
