import axios from "axios";

const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/locations");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/locations/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const create = async (location) => {
    try {
        const response = await axios.post("http://localhost:3000/locations", location);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateById = async (id, location) => {
    try {
        const response = await axios.put(`http://localhost:3000/locations/${id}`, location);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/locations/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default { index, getById, create, updateById, deleteById };
