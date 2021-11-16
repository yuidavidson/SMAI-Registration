import axios from "axios";

class SmaiApi {
    run(cmd, data=null) {
        if (!cmd.match(/^[a-z0-9\/]+$/)) {
            return Promise.reject('bad command');
        }
        let dataEncoded = null;
        if (data) {
            Object.entries(data).map(e => encodeURIComponent(e[0])+'='+encodeURIComponent(e[1])).join('&');
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
