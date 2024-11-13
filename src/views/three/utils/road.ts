// 直线道路
export const lineRoad = (params: any = {}) => {

  const { THREE, scene, ThreeFn, position, width = 1, height = 50, color = 0x4c4b4a, rotateZ } = params

  // 路面
  const geometry = new THREE.PlaneGeometry( width, height );
  const material = new THREE.MeshBasicMaterial( {color, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );

  plane.rotation.x = 1.5721

  if(params.actionType === 'render'){
    plane.material.color = new THREE.Color(params.data.content.material.color)
    plane.rotation.z = params.data.content.rotation.z
  }else{
    plane.rotation.z = rotateZ || 0
  }
  
  // plane.rotateX(1.5721)
  // plane.rotateZ(params.data && params.data.content.rotateZ || rotateZ || 0)
  // if(rotateZ){
  //   plane.rotateZ(rotateZ)
  // }
  plane.position.y = 3
  plane.position.x = position.x
  plane.position.z = position.z
  scene.add( plane );

  // 白线
  const whiteLineGeometry = new THREE.PlaneGeometry( width/width, height );
  const whiteLineMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  const leftLine = new THREE.Mesh( whiteLineGeometry, whiteLineMaterial );

  leftLine.position.x = -width/2+.5
  plane.add( leftLine );

  const rightLine = leftLine.clone()
  rightLine.position.x = width/2-.5
  plane.add( rightLine );

  // 虚线
  const whiteDashLineGeometry = new THREE.PlaneGeometry( width/100, width );
  const whiteDashLineMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  for(let i = 0; i < (height/2)/width; i++){
    const whiteDashLine = new THREE.Mesh( whiteDashLineGeometry, whiteDashLineMaterial );
    whiteDashLine.position.x = 0
    whiteDashLine.position.y = -(height/2-2*width*i)
    plane.add( whiteDashLine );
  } 

  ThreeFn && ThreeFn.customizeItem(params, plane)
}


// 直角转弯
export const roundRoad = (params: any = {}) => {
  const { THREE, scene, ThreeFn, position, width = 20, height = 50, color = 0x4c4b4a, edge = true, rotateZ } = params

  const line = 1

  // 创建一个基本的形状
  const shape = new THREE.Shape();

  if(edge){
    shape.moveTo(-width, 0);
    shape.quadraticCurveTo(-width, -width, 0, -width);
  }else{
    shape.moveTo(-width, -width);
  }
  shape.lineTo(width, -width);
  shape.lineTo(width, 0);
  if(edge){
    shape.moveTo(width/2, 0);
    shape.quadraticCurveTo(0, 0, 0, width/2);
  }else{
    shape.lineTo(0, 0);
  }
  shape.lineTo(0, width);
  shape.lineTo(-width, width);
  // 创建形状几何体
  const geometry = new THREE.ShapeGeometry(shape);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
  // 使用形状创建网格
  const mesh: any = new THREE.Mesh(geometry, material);
  mesh.position.y = 3
  mesh.position.x = position.x
  mesh.position.z = position.z
  mesh.rotateX(1.5721)
  if(rotateZ){
    mesh.rotateZ(rotateZ)
  }
  scene.add(mesh);


// 外边线
  // 创建一个基本的形状
  const shape1 = new THREE.Shape();

  if(edge){
    shape1.moveTo(-width, 0);
    shape1.quadraticCurveTo(-width, -width, 0, -width);
  }else{
    shape1.moveTo(-width, -width);
  }
  shape1.lineTo(width, -width);
  shape1.lineTo(width, -width+line);
  if(edge){
    shape1.moveTo(0, -width+line);
    shape1.quadraticCurveTo(-width+line, -width+line, -width+line, 0);
  }else{
    shape1.lineTo(-width+line, -width+line);
  }
  shape1.lineTo(-width+line, width);
  shape1.lineTo(-width, width);
  // 创建形状几何体
  const geometry1 = new THREE.ShapeGeometry(shape1);
  // 创建材质
  const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  // 使用形状创建网格
  const mesh1: any = new THREE.Mesh(geometry1, material1);
  mesh.add(mesh1);


// 内边线
  // 创建一个基本的形状
  const shape2 = new THREE.Shape();

  if(edge){
    shape2.moveTo(-line, width/2);
    shape2.quadraticCurveTo(-line, -line, width/2, -line);
  }else{
    shape2.moveTo(-line, -line);
  }
  shape2.lineTo(width, -line);
  shape2.lineTo(width, 0);
  if(edge){
    shape2.moveTo(width/2, 0);
    shape2.quadraticCurveTo(0, 0, 0, width/2);
  }else{
    shape2.lineTo(0, 0);
  }
  shape2.lineTo(0, width);
  shape2.lineTo(-line, width);
  // 创建形状几何体
  const geometry2 = new THREE.ShapeGeometry(shape2);
  // 创建材质
  const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  // 使用形状创建网格
  const mesh2: any = new THREE.Mesh(geometry2, material1);
  mesh.add(mesh2);

  ThreeFn && ThreeFn.customizeItem(params, mesh)
}

// T形道路
export const crossRoad = (params: any = {}) => {
  const { THREE, scene, position, ThreeFn, width = 20, height = 50, color = 0x4c4b4a, isTRoad = false, rotateZ } = params

  const line = 1

  const geometry = new THREE.PlaneGeometry( width, width );
  const material = new THREE.MeshBasicMaterial( {color, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );

  plane.position.y = 1
  plane.position.x = position.x
  plane.position.z = position.z
  plane.rotateX(1.5721)
  if(params.actionType === 'render'){
    plane.rotation.z = params.data.content.rotation.z
  }else{
    plane.rotation.z = rotateZ || 0
  }
  scene.add( plane );

  if(isTRoad){
    // 白线
    const whiteLineGeometry = new THREE.PlaneGeometry( line, height );
    const whiteLineMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    const whiteLine = new THREE.Mesh( whiteLineGeometry, whiteLineMaterial );

    whiteLine.position.x = -width/2+line/2
    plane.add( whiteLine );
  }
  ThreeFn && ThreeFn.customizeItem(params, plane)
}
