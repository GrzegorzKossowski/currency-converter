import axios from 'axios';
import config from '../config/config'

class HttpService {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    _getUrl = (endpoint) => {
        return this._getHost() + endpoint;
    };

    _getHost = () => {
        const HOST = config.HOST;
        if (!HOST) throw new Error('Cannot get host address from config file');
        return HOST;
    };

    _resolveHeaders = (customHeaders = {}) => {
        return { ...this.headers, ...customHeaders };
    };

    get = options => axios({
        headers: this._resolveHeaders(options.headers),
        method: 'GET',
        url: this._getUrl(options.endpoint),
    })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                options.onSuccess(response.data);
            } else {
                throw new Error('Data not loaded', response);
            }

        })
        .catch(error => console.log(error))


}

export default HttpService;