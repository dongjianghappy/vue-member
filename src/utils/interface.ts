// 连线
interface props{
  data?: Object,
  dataList: any
  render?: Function
  style?: Object
  source: {
    id: string
  },
  target: {
    id: string
  },
  ftype: string,
  vertices: []
}