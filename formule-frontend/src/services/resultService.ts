import API from '../api';

export const getResults = async () => {
    const response = await API.get('/result');
    return response.data;
};

export const getResultById = async (id: string) => {
    const response = await API.get(`/result/${id}`);
    return response.data;
};

export const createResult = async (result: any) => {
    const response = await API.post('/result', result);
    return response.data;
};
