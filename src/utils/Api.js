import axios from 'axios'

const instance = axios.create({ baseURL: 'https://api.github.com/' })

const token = process.env.USER_TOKEN
if (token) {
  instance.defaults.headers.common.Authorization = `token ${token}`
}

const searchRepo = (query) => (
  instance.get(`search/repositories?q=${query}&per_page=10`)
    .then(res => (res['data']['items'])
    )
)

export default searchRepo
