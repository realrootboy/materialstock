import api from './api';

const base_path = '/costumer';

class MaterialService {
    static list = async () => {
        const response = await api.get(base_path);
        return response.data;
    }

    static delete = async (id) => {
        const response = await api.delete(`${base_path}/${id}`);
        return response.status;
    }

    static insert = async (data) => {
        const response = await api.post(base_path, data);
        return response.data;
    }

    static edit = async (id, data) => {
        const response = await api.put(`${base_path}/${id}`, data);
        return response.data;
    }

    static findOne = async (id) => {
        const response = await api.get(`${base_path}/${id}`);
        return response.data;
    }
}

export default MaterialService;