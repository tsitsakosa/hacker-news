import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/'
});

export default instance;