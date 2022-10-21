import axios from 'axios';

export const client = axios.create({
    baseURL: "https://youtube-music1.p.rapidapi.com"
})
