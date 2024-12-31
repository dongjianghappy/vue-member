import { image } from "@/utils/fn"
import { color } from "./common_const"

// 材质种类
export const  materialType = [
	{name: "基础网格材质", value: "MeshBasicMaterial"},
	{name: "深度网格材质", value: "MeshDepthMaterial"},
	{name: "Phong网格材质", value: "MeshPhongMaterial"}
]

export const threeConfig = {
	"BoxGeometry": {
		width: 100,
		height: 100,
		depth: 100,
		color: 0x00ff00,
		image: ""
	},
	"CircleGeometry": {
		radius: 250,
		segments: 100,
		color: 0xffff00,
		image: ""
	},
	"ConeGeometry": {
		radius: 100,
		height: 100,
		radialSegments: 100,
		color: 0xffff00,
		image: ""
	},
	"CylinderGeometry": {
		radiusTop: 100,
		radiusBottom: 100,
		height: 100,
		radialSegments: 100,
		color: 0xffff00,
		image: ""
	},
	"PlaneGeometry": {
		width: 300,
		height: 300,
		color: 0xffff00,
		image: ""
	},
	"SphereGeometry": {
		radius: 100,
		widthSegments: 100,
		heightSegments: 100,
		color: 0xffff00,
		image: ""
	},
	"textTool": {
		name: '新建文本111',
		color: '#ffff00',
		size: '60'
	}
}
export const three3DType = {
	geometry: [
		'BoxGeometry',
		'CircleGeometry',
		'ConeGeometry',
		'CylinderGeometry',
		'PlaneGeometry',
		'SphereGeometry'
	],
	light: [
		'AmbientLight',
		'DirectionalLight',
		'HemisphereLight',
		'LightProbe',
		'PointLight',
		'RectAreaLight',
		'SpotLight',
	],
	helper: [
		'GridHelper',
		'AxesHelper'
	]
}

// 几何类型
export const geometryType = [
	'BoxGeometry',
	'CircleGeometry',
	'ConeGeometry',
	'CylinderGeometry',
	'PlaneGeometry',
	'SphereGeometry'
]

// 灯光类型
export const lightType = [
	'AmbientLight',
	'DirectionalLight',
	'HemisphereLight',
	'LightProbe',
	'PointLight',
	'RectAreaLight',
	'SpotLight'
]