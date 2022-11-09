import axios from 'axios';
import axiosClient from './axiosClient';

const dictionaryAPI = {
    getAll: () => {
        const url = `/all`;
        return axiosClient.get(url);
    },
    save: (data) => {
        const url = ``;
        return axiosClient.post(url,data);
    }

};

export default dictionaryAPI;
