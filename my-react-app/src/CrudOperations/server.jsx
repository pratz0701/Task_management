import axios from 'axios';
import { authAPI, getDeviceId, getPlainObject } from '../lib/util';

import { API_URLS } from './constants';
import Events from '../lib/events';

const server = axios.create({
  // baseURL: API_PATH,
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    source: 'task_manager',
  },
});


server.interceptors.request.use((config) => {
  return config;
});
const refreshTokenHandler = async (err, resolve, reject) => {
  const originalReq = err.config;
   
  if (err?.response?.status === 401 && err.config && !err.config.__isRetryRequest) {
     
    originalReq._retry = true;
    const authData = await authAPI.getAuth();
    const { tokens, userId } = getPlainObject(authData);

    const res = fetch(join(process.env.REACT_APP_API_PATH_AUTH, API_URLS.refreshToken), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      xhrFields: { withCredentials: true },
      cache: 'no-cache',
      mode: 'cors',
      body: JSON.stringify({
        refreshToken: tokens.refreshToken,
        userId,
        deviceId: getDeviceId(),
      }),
    }).then((response) => response.json()).then(async (data) => {
      if (data.accessToken) {
        authAPI.setAuth('tokens', {
          tokens: {
            accessToken: data.accessToken, refreshToken: data.refreshToken,
          },
        });
        originalReq.headers.accessToken = data.accessToken;
        server.defaults.headers.common.accessToken = data.accessToken;
        return axios(originalReq).then((rep) => rep?.data);
      }
      await authAPI.setAuth('phoneNumber', { phoneNumber: null });
      await authAPI.setAuth('userId', { userId: null });
      await authAPI.setAuth('tokens', { tokens: null });
      Events.trigger('logout');
      alert('Session expired.');

       
      location.replace('/app');

      return true;
    });

    resolve(res);
  }
  return reject(err);
};

server.interceptors.response.use((response) => response,
  (err) => new Promise((resolve, reject) => refreshTokenHandler(err, resolve, reject)));

export default server;
