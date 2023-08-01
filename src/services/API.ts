import axios from "axios";
import '../styles/loading.scss';
import { toast } from 'react-toastify';
import { ErrorMessage } from "../utils/error";

export const baseUrl = 'http://business-api.annaniks.com/';
const API = axios.create({
    baseURL: baseUrl,
    responseType: 'json'
});
export const mediaUrl = baseUrl + 'videos/'
export const pageCount = 10;
function createLoaderElement(): void {
    document.body.classList.add('loading-indicator');
}
function removeLoaderElement(): void {
    document.body.classList.remove('loading-indicator');
}
const urlsToNotUse = ['assets']

API.interceptors.request.use(
    (config) => {
        if (isValidRequestForInterceptor(config.url!)) {
            createLoaderElement();
        }
        const token = localStorage.getItem('access');
        if (config.url !== 'auth/login/role' && !!config?.headers && token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

function isValidRequestForInterceptor(url: string): boolean {
    for (const address of urlsToNotUse) {
        if (new RegExp(address).test(url)) {
            return false;
        }
    }
    return true;
}

API.interceptors.response.use(
    (res) => {
        removeLoaderElement();
        if (res?.data?.error) {
            toast.error(res?.data?.error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            return Promise.reject(res?.data?.error)
        }

        return res;
    },
    async (err) => {
        removeLoaderElement();
        if (err.response.status === 500) {
            toast.error(ErrorMessage.somethingWentWrong, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        if (err.response.status === 400 || err.response.status === 409) {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        if (err.response.status === 403) {
            logout();
        }
        return Promise.reject(err)
    }
)
export const logout = (isNavigate = true) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    if (isNavigate) {
        window.location.href = '/';
    }
}
export default API;