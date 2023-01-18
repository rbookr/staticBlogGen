import axios, {AxiosRequestConfig} from 'axios';



const service = axios.create({
    baseURL: '/', // 设置统一的请求前缀
    timeout: 3000, // 设置统一的超时时长
});

function myAxios(axiosConfig:AxiosRequestConfig) {
  return service(axiosConfig)
}

export default myAxios;


interface md_server_return_interface {
    __content:string
}

export const get_md = (filename:string) : Promise<md_server_return_interface>  => {
    return myAxios({
        url: filename,
        method: 'get',
    }).then( res => res.data)
}
