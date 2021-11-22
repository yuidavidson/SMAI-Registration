import axios from "axios";

class SmaiApi {
    run(cmd, data=null) {
        if (!cmd.match(/^[a-z0-9\/]+$/)) {
            return Promise.reject('bad command');
        }
        let dataEncoded = null;
        if (data) {
            dataEncoded = Object.keys(data).map(k => encodeURIComponent(k) +'='+ encodeURIComponent(data[k])).join('&');
        }

        return axios({
            method: 'POST',
            url: `https://smai.us/index.php?option=com_smapi&api=${cmd}`,
            data: dataEncoded,
        })
          .then(response => response.data)
          .catch(function (error) {
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
export default smaiApi  = new SmaiApi();
