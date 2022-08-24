import axios from "axios";
const baseUrl = '/api/login'

const login = async credential => {
    console.log(credential);
    const response = await axios.post(baseUrl, credential)
    return response.data
}

export default { login }