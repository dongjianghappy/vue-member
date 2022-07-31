import basicInfo from "./basic";

export default class start extends basicInfo {
  source: any
  target: any
 
  constructor(_data: any){
    let data = {
      source: "",
      target: "",
      name: '',
      ..._data
    }
    super(data);
    this.source = data.source
    this.target = data.target
    this.name = data.name

  }
}