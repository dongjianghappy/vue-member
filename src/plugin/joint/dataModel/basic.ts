
export default class basicInfo{
  id: string | number | undefined
  type: number | undefined
  name: string |undefined
  valid?: boolean
  constructor(data: any){
    let {id, name, type} = data
    this.id = String(id)
    this.type = type
    this.name =name
  }
}