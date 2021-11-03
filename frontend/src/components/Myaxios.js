import axios from 'axios'

axios.defaults.withCredentials = true;
const $axios = axios.create({
  withCredentials: true
})
export default $axios