import start from "./start";
import linkNode from './link'

// 坐标
interface Point{
  x: number
  y: number
}

// 节点
interface Node{
  id: string,
  name: string,
  position: Point
  data: start // start | end | question
  ftype: string
}

// 连线
interface Link{
  id: string
  data: linkNode
  source: {
    id: string
  },
  target: {
    id: string
  },
  ftype: string,
  vertices: []
}

// 节点和连线
type cell = Node | Link

export {
  cell,
  Node,
  start,
  Link,
  linkNode
}