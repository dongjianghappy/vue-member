import info from './info.vue'
import tips from './tips.vue'


export const component = (param: any) => {

  let name: any = ""
  switch(param.type){
    case 'tips':
      name = tips
      break;
    case 'info':
      name = info
      break;
    
  }
  return name
}