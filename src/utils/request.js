import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'http://localhost/wateryun',
    baseURL: 'http://123.56.91.110/esddp',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// export default service;
export function get(url,params){
    return service.get(url,{
        params
    })
}
export function post(url,data){
    return service.post(url,data)
}
export function del(url){
    return service.delete(url)
}
export function put(url,data){
    return service.put(url,data)
}