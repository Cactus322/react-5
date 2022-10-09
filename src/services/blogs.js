import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (blogObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, blogObject, config);
    return response.data;
};

const putLike = async (blogObject, link) => {
    const response = await axios.put(`${baseUrl}/${link}`, blogObject);

    return response.data;
};

const deleteBlog = async (link) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${link}`, config);

    return response.data;
};

const blogService = {
    getAll,
    create,
    setToken,
    putLike,
    deleteBlog,
};

export default blogService;
