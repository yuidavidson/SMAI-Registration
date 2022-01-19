import axios from "axios";
import config from '../config.js';

const smaiApiCache = {};
const baseUrl = !!config.api.base ? config.api.base : '';
class SmaiApi {
  // setters from React components when an api responses arrives,

  //  loading: react app might want to update UI when API is loading/not
  #loadingSetter = () => {};

  //  auth user: api response is standard and always contains the current auth user if logged in
  //             hence set the use if use is
  #authUserSetter = () => {};
  //   track last auth user, so we can check if auth user has changed,
  //   so that we don't necessarily trigger updates in react app
  #currentAuthUser = null;
  #lastAuthUser = null;

  setLoadingSetter(setter) {
    this.#loadingSetter = setter;
  }

  setAuthUserSetter(setter) {
    this.#authUserSetter = setter;
  }

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

    //console.log('api call: ' + cmd);
    if (useCache) {
      if (smaiApiCache[cmd + '::' + dataEncoded]) {
        //console.log('api call from cache');
        return Promise.resolve(smaiApiCache[cmd + '::' + dataEncoded]);
      }
    } else {
      delete smaiApiCache[cmd + '::' + dataEncoded];
    }
    //console.log('api call fresh from SERVER');

    // only set loading ON after checking cache and other QUICK pre-api code
    // (it doesn't make sense to turn loading on/off for too brief of actions)
    this.#loadingSetter(true);

    return axios({
      method: 'POST',
      url: `${baseUrl}/index.php?option=com_smapi&api=${cmd}`,
      data: dataEncoded,
    })
      .then(response => {
        if (useCache) {
          smaiApiCache[cmd + '::' + dataEncoded] = response.data;
        }
        this.#currentAuthUser = response.data.user ? {...response.data.user} : null;
        return response.data;
      })
      .catch(error => {
        if (useCache) {
          delete smaiApiCache[cmd + '::' + dataEncoded];
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.#currentAuthUser = error.response.data.user ? {...error.response.data.user} : null;
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
      })
      .finally(() => {
        this.#loadingSetter(false);

        // if a change occurred to auth user
        //   either user does not match (empty to not-empty or vice-versa)
        //   OR user ID's don't match
        if ((this.#currentAuthUser ? this.#currentAuthUser.id : null) !== (this.#lastAuthUser ? this.#lastAuthUser.id : null)) {
          this.#authUserSetter(this.#currentAuthUser);
          this.#lastAuthUser = this.#currentAuthUser;
        }
      });
  }
}

let smaiApi;
export default smaiApi = new SmaiApi();
