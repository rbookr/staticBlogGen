import axios from 'axios';
const service = axios.create({
    baseURL: '/',
    timeout: 3000, // 设置统一的超时时长
});
function myAxios(axiosConfig) {
    return service(axiosConfig);
}
export default myAxios;
