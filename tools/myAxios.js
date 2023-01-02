
import axios from 'axios';

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: '/', // 设置统一的请求前缀
    timeout: 3000, // 设置统一的超时时长
  });

  return service(axiosConfig)
}

export default myAxios;
