import axios from "axios";

import router from './router'


const instance = axios.create({
  //baseURL: 'http://127.0.0.1:8090/gd/api/v1/'
  baseURL: 'http://20.127.118.141:8090/gd/api/v1/'
});


instance.interceptors.request.use((config) => {
 
  config.headers.Accept = 'application/json'
  config.headers["Content-Type"] = 'application/json'

  const usuario =  JSON.parse( localStorage.getItem('usuario') );

  if (usuario && usuario.jwttoken ) {
    config.headers.Authorization = `Bearer ${usuario.jwttoken}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})


instance.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {

  localStorage.clear()
  router.push('/') 
 
}
 return Promise.reject(error);
});

export default instance

