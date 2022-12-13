import axios from "axios"

// const baseURL = 'https://bbsapi-dev.seoly.me/api/v1'
// const baseURL = 'https://localhost:9000/api/v1'

axios.defaults.withCredentials = true

export const request = axios.create({
  baseURL: 'https://localhost:9000/api/v1',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  transformResponse: [(res) => {
    return JSON.parse(res).data
  }],
})