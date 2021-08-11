import axios from 'axios';
import {hideLoader} from "../components/Loader/loader.component";

// export const baseUrl = 'http://localhost:1337/';

export const baseUrl = 'https://vast-ridge-10824.herokuapp.com/';

export const httpGet = async (url) => {
    try {
        const { data } = await axios.get(`${url}`);
        return data;
    } catch (error) {
        return error;
    }
};


export const httpDelete = async (url) => {
    try {
        const { data } = await axios.delete(`${url}`);
        return data;
    } catch (error) {
        return error;
    }
};


export const httpPost = async (url, postBody) => {
    try {
        const { data } = await axios.post(url, postBody);
        return data;
    } catch (error) {
        hideLoader();
        return error;
    }
};

export const httpPut = async (url) => {
    try {
        const { data } = await axios.put(url);
        return data;
    } catch (error) {
        return error;
    }
};


