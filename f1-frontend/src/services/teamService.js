import API from '../api';
export const getTeams = async () => {
    const response = await API.get('/teams');
    return response.data;
};
export const createTeam = async (team) => {
    const response = await API.post('/teams', team);
    return response.data;
};
export const updateTeam = async (id, team) => {
    const response = await API.put(`/teams/${id}`, team);
    return response.data;
};
