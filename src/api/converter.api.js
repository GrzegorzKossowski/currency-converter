import HttpService from '../services/httpService';
import ENDPOINTS from '../config/endpoints';
import CONFIG from '../config/config';
import { convertMock, currenciesMock } from './dataMock'

export const fetchConversionData = (fromCurrency, toCurrency) => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.CONVERTER}?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${CONFIG.API_KEY}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        })
    })
}

export const fetchAllCurrencies = () => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.CURRENCIES}?apiKey=${CONFIG.API_KEY}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        })
    })
}

export const fetchExpenditure = () => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.USAGE}?apiKey=${CONFIG.API_KEY}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        })
    })
}


export const fetchConvertMock = () => {
    return Promise.resolve(convertMock);
}

export const fetchCurrenciesMock = () => {
    return Promise.resolve(currenciesMock);
}