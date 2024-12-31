export const geometryInfo = {
	fid: '',
	name: '新建元素',
	uuid: '',
	type: '',
	visible: true,
	source: 'item',
	roadLine: {
		id: '',
		isRun: 0,
		progress: 0,
		velocity: 0.001
	},
	position: {
		x: 0,
		y: 0,
		z: 0
	},
	parameters: {},
	material: {
    materialType: 'MeshBasicMaterial',
    transparent: false,
		isMorePlane: '0',
		color: '#FFFF00',
		image: '',
    side: 'FrontSide',
		map: [],
		text: {
			content: '',
			color: '',
			size: '',
			position: {
				x: 0,
				y: 0,
				z: 0
			}
		}
	},
	rotation: {
		x: 0,
		y: 0,
		z: 0
	},
	event: {
		status: 1,
		target: ""
	},
	voice: {
		audio: '',
		broadcast: '',
		speech: ''
	},
	animation: {
		x: 0,
		y: 0,
		z: 0
	}
}

export const lightInfo = {
    fid: '',
    name: '添加光元素',
    uuid: '',
    type: '',
    visible: true,
    parameters: {},
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
}

export const helperInfo = {
    fid: '',
    name: '辅助工具元素',
    uuid: '',
    type: '',
    color: '',
    parameters: {},
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
}

export const textInfo = {
    fid: '',
    name: '新建文本',
    uuid: '',
    color: '#ffff00',
    size: 24,
    source: 'tool',
    position: {
      x: 0,
      y: 25,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    animation: {
      x: 0,
      y: 0,
      z: 0
    }
}