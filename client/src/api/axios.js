import Axios from 'axios';

export const AxiosDefault = Axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
