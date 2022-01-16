import axios from "axios";
import config from '../config.js';

const smaiApiCache = {};
const baseUrl = !!config.api.base ? config.api.base : '';

class SmaiApi {

  ping() {
    return this.run('ping');
  }

  run(cmd, data = null, useCache = false) {
    if (!cmd.match(/^[a-z0-9\/]+$/)) {
      return Promise.reject('bad command');
    }
    let dataEncoded = null;
    if (data) {
      dataEncoded = Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
    }

    console.log('api call: ' + cmd);
    if (useCache) {
      if (smaiApiCache[cmd + '::' + dataEncoded]) {
        console.log('api call from cache');
        return Promise.resolve(smaiApiCache[cmd + '::' + dataEncoded]);
      }
    } else {
      delete smaiApiCache[cmd + '::' + dataEncoded];
    }
    console.log('api call fresh from SERVER');
    return axios({
      method: 'POST',
      url: `${baseUrl}/index.php?option=com_smapi&api=${cmd}`,
      data: dataEncoded,
    })
      .then(response => {
        if (useCache) {
          smaiApiCache[cmd + '::' + dataEncoded] = response.data;
        }
        return response.data;
      })
      .catch(function (error) {
        if (useCache) {
          delete smaiApiCache[cmd + '::' + dataEncoded];
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return error.response.data;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return {errors: error.message};
        } else {
          // Something happened in setting up the request that triggered an Error
          return {errors: error.message};
        }
      });
  }
}

let smaiApi;
export default smaiApi = new SmaiApi();
