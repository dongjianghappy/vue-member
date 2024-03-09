<template>
  <div class="about">
    <div :id="`three${data.id}`" style="width:100%; height: 100%;"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export default {
  props:['data'],
  data () {
    return {
      ids:this.data.id,

    }
  },
  mounted: function () {
    this.$nextTick(() => {
      const threeId = `three${this.ids}`
      this.getList(this.data, threeId)
    })
  },
  methods: {
    getList (data, threeId) {
      let camera, scene, renderer;

      const state = { variant: 'midnight' };

      init();
      render();

      function init() {

        const domThree = document.getElementById(threeId)
        const boxWidth = domThree.offsetWidth
        const boxHeight = domThree.offsetHeight

        const container = document.createElement( 'div' );
        document.getElementById(threeId).appendChild( container );


        // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 2, 10000 );
        camera = new THREE.PerspectiveCamera( 45, boxWidth / boxHeight, data.cameraNear, data.cameraFar );
        camera.position.set( ...data.cameraPosition );
        camera.lookAt(...data.cameraLookAt);
        scene = new THREE.Scene();
        scene.background = new THREE.Color( data.color || '#f6f8f9' );

        /*new RGBELoader()
          .setPath( './three/textures/equirectangular/' )
          .load( 'venice_sunset_1k.hdr', function ( texture ) {*/

          /*new THREE.TextureLoader().load( './three/textures/equirectangular/bloomberg.jpg', function ( texture ) {
            texture.mapping = THREE.EquirectangularReflectionMapping;*/
            
            scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );
            
            // scene.background = texture;
            /*scene.environment = texture;*/

            // render();

            // model

            const loader = new GLTFLoader().setPath( data.loaderSetPath );
            loader.load( data.loaderLoad, function ( gltf ) {
              
              gltf.scene.scale.set( ...data.gltfSceneScaleSet );
              
              scene.add( gltf.scene );


              render();

            } );

          // } );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( boxWidth, boxHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild( renderer.domElement );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); // use if there is no animation loop
        controls.minDistance = data.controlsMinDistance;
        controls.maxDistance = data.controlsMaxDistance;
        controls.target.set( ...data.controlsTargetSset );
        controls.update();

      }



      function render() {

        renderer.render( scene, camera );
        // console.log(camera.lookAt)
      }

    }
  }
}
</script>
