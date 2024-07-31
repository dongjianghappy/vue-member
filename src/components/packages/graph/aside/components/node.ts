export const _circle = (params: any) => {

  const {joint, config, stencilGraph} = params

  var circle = new joint.shapes.standard.Circle();
  
  circle.resize(64, 64);
  circle.position(60, 20);
  circle.attr('root/title', 'joint.shapes.standard.Circle');
  circle.attr('label/text', '圆形');
  circle.attr('body/stroke', config.circle.borderColor);
  circle.prop('ftype', 'circle')
  circle.addTo(stencilGraph);
}

export const _rectangle = (params: any) => {

  const {joint, config, stencilGraph} = params

  var rectangle = new joint.shapes.standard.Rectangle();
  
  rectangle.resize(100, 50);
  rectangle.position(40, 140);
  rectangle.attr('root/title', 'joint.shapes.standard.Rectangle');
  rectangle.attr('label/text', '矩形');
  rectangle.attr('body/stroke', config.rect.borderColor);
  rectangle.prop('ftype', 'rect')
  rectangle.addTo(stencilGraph);
}

export const _polygon = (params: any) => {

  const {joint, config, stencilGraph} = params

  var polygon = new joint.shapes.standard.Polygon();
  polygon.resize(100, 100);
  polygon.position(40, 210);
  polygon.attr('root/title', 'joint.shapes.standard.Polygon');
  polygon.attr('label/text', '多边形');
  polygon.attr('body/stroke', config.polygon.borderColor);
  polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');
  polygon.prop('ftype', 'polygon')
  polygon.addTo(stencilGraph);
}

export const _ellipse = (params: any) => {

  const {joint, config, stencilGraph} = params

  var ellipse = new joint.shapes.standard.Ellipse();
  ellipse.resize(100, 60);
  ellipse.position(40, 330);
  ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
  ellipse.attr('label/text', '椭圆形');
  ellipse.attr('body/stroke', config.ellipse.borderColor);
  ellipse.prop('ftype', 'ellipse')
  ellipse.addTo(stencilGraph);
}