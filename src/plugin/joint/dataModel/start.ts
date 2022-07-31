import basicInfo from "./basic";

export default class start extends basicInfo {
  id: any
  name: any;
 
  constructor(_data: any){
    let data = {
      id: "",
      name: '',
      ..._data
    }
    super(data);
    this.id = data.id
    this.name = data.name

  }
}