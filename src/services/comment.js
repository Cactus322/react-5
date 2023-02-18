import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (commentObject, link) => {
    const response = await axios.post(
        `${baseUrl}/${link}/comments`,
        commentObject
    )

    return response.data
}

const commentService = {
    create,
}

export default commentService
