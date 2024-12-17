import API from '../api';

export const getResults = async () => {
    const response = await API.get('/results');
    return response.data;
};

export const createResult = async (result: any) => {
    const response = await API.post('/results', result);
    return response.data;
};
