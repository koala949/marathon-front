import axios from 'axios';
import { API_HOST } from '@/constants/config';

axios.defaults.baseURL = API_HOST;
/**
 * 不带token的请求
 */
const noAuthAxios = axios.create();

const requestQueue = [];

noAuthAxios.interceptors.response.use(
  function(response) {
    const { failed, code, message } = response.data;
    if (failed) {
      return {
        success: false,
        msg: message || code,
        __response: response,
      };
    }
    return {
      success: true,
      data: response.data,
      __response: response,
    };
  },
  function(error) {
    if (!error.response) return { success: false, msg: '未知异常' };
    return {
      success: false,
      data: {},
      msg: error.response.statusText,
      __response: error.response,
    };
  },
);

export { noAuthAxios };
