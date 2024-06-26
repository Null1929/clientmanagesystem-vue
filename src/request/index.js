import axios from 'axios';
import {Loading} from 'element-ui';
import router from '@/router';

const host = "/api";
const httpRequest = axios.create({
    baseURL: host,
    timeout: 50 * 1000,
})

const controller = new AbortController();

let loading = null;
//创建请求拦截器
httpRequest.interceptors.request.use(config => {

    //用于进行访问拦截
    /**
     * 只有当用户登录之后才可以进行其他的数据访问，否则将会跳转到登录页面
     */
    if (config.url.match('user') === null) {
        if(config.url.match("vc.png")===null) {
            if (sessionStorage.length === 0) {
                controller.abort()
                router.push('/user/log')
            }
        }
    }
    //全局设置请求头
    config.headers.set("Token", sessionStorage.getItem('token'));

    //开启加载loading
    if (config.url.match('chat') === null) {
        loading = Loading.service({
            lock: true,
            text: '加载中。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
    }
        return config;
}, error => {
    return Promise.reject(error);
});

//创建响应拦截器
httpRequest.interceptors.response.use(response => {

    //关闭加载loading
   if (loading != null){
       loading.close();
   }

    return response;
}, error => {
    if (loading != null){
        loading.close();
    }
    return Promise.reject("错误");
})

//导出axios实例
export default httpRequest;