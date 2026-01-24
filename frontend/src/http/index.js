import axios from "axios";
import { Toast } from "antd-mobile";

axios.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截
axios.interceptors.request.use(request => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = token
    }
    return request
})


//响应拦截
axios.interceptors.response.use(
    (response) => {
        // 检查是否有code字段，避免错误访问
        if (response.data.code !== undefined && response.data.code !== 1) {
            Toast.show({
                icon: 'fail',
                content: response.data.message || '操作失败'
            })
            return Promise.reject(response)
        }
        return response
    },
    (res) => {
        // 程序性错误处理
        if (res.response?.status !== 200) {
            Toast.show({
                icon: 'fail',
                content: res.response?.data?.message || '请求失败'
            })
        }

        if (res.response?.status === 416) {
            // 没有权限，重定向到登录页面
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
        
        return Promise.reject(res)
    }
)

export default axios