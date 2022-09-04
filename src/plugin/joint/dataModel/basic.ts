
export default class basicInfo{
  id: string | number | undefined
  type: number | undefined
  name: string |undefined
  description: string |undefined
  basicSpeech: Array<Object> // 基本话术
  objectionIntention: Array<Object> // 异议话术
  endIntention: Array<Object> // 结束话术
  valid?: boolean
  constructor(data: any){
    let {id, name, description, basicSpeech, objectionIntention, endIntention, type} = data
    this.id = String(id)
    this.type = type
    this.name = name
    this.description = description
    this.basicSpeech = basicSpeech || [{speech: ''}]
    this.objectionIntention = objectionIntention || []
    this.endIntention = endIntention || []
  }
}