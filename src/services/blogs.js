import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (blogObject) => {
    axios.post(baseUrl, blogObject)
};


const blogService = {
    getAll,
    create,
};

export default blogService;
