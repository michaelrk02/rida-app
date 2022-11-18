import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosAPI.interceptors.request.use(
  function(config) {
    if (localStorage.getItem('AUTH_TOKEN') !== null) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('AUTH_TOKEN');
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    var message = '';
    if ((typeof(error.response.data) !== 'undefined') && (typeof(error.response.data.message) !== 'undefined')) {
      message = ': ' + error.response.data.message;
    }
    alert('Terjadi sebuah kegagalan' + message);

    return Promise.reject(error);
  }
)

export default axiosAPI;
