import Axios from 'axios'
var axios = Axios.create()

export const httpService = {
    get(endpoint) {
        return ajax(endpoint, 'GET')
    },
    post(endpoint) {
        return ajax(endpoint, 'POST')
    },
    put(endpoint) {
        return ajax(endpoint, 'PUT')
    },
    delete(endpoint) {
        return ajax(endpoint, 'DELETE')
    }
}

async function ajax(endpoint, method = 'GET') {
    try {
        const res = await axios({
            url: `${endpoint}`,
            method
        })
        // res.data.success= false
        console.log(res.data);
        if (!res.data.success) throw res
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}`)
        if (err.response && err.response.status === 500) {
            console.log('Had Issues with server side')
        }
        throw err
    }
}