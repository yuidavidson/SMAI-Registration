import axios from "axios";

class SmaiApi {
    run(cmd, data=null) {
        if (!cmd.match(/^[a-z0-9\/]+$/)) {
            return Promise.reject('bad command');
        }
        let dataEncoded = null;
        if (data) {
            dataEncoded = {};
            Object.keys(data).forEach(k => dataEncoded[encodeURIComponent(k)] = encodeURIComponent(data[k]));
        }

        return axios({
            method: 'POST',
            url: `https://smai.us/index.php?option=com_smapi&api=${cmd}`,
            data: dataEncoded,
        }).then(response => response.data);
    }
}

let smaiApi;
export default smaiApi  = new SmaiApi();
