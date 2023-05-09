export const PortGroups = {
  'top': {
    position: {
        name: 'absolute',
        args: { y: 25 }
    },
  },
  'right': {
    position: {
        name: 'absolute',
        args: { y: 25 }
    },
  },
  'bottom': {
    position: {
        name: 'absolute',
        args: { y: 25 }
    },
  }
}

export const anchorPort = {
  id: 'anchor',
  group: 'bottom',
  z: 10,
  args: { x: 6 },
  attrs: { 
    body: { magnet: true, width: 8, height: 8, x: -8, y: -4, stroke: 'red', fill: 'white'},
    label: { text: 'port', fill: 'blue' }
},
markup: [{ 
  tagName: 'rect', selector: 'body', attributes: { 'width': 20, 'height': 20, 'fill': 'blue' }
}]
}