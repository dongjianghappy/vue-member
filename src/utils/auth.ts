export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token: any) => {
  return localStorage.setItem('token', token)
}

export const isLogined = (token: any) => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

export const clearToken = () => {
  localStorage.removeItem('token')
}

export const getUid = () => {
  debugger
 let uid = ""
 const arr = window.location.pathname.split("/u/")
 if(arr.length > 1){
   uid = arr[1].split("/")[0]
 }
 return uid
}

