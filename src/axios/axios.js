import axios from 'axios'


export default axios.create({
    baseURL: 'https://planning-23ff9.firebaseio.com/'
})