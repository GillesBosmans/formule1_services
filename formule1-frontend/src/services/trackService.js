import API from '../api';
export const getTracks = async () => {
    const response = await API.get('/tracks');
    return response.data;
};
export const createTrack = async (track) => {
    const response = await API.post('/tracks', track);
    return response.data;
};
