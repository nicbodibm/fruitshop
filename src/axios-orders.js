import axios from 'axios';
// Class to access the firebase database
const instance = axios.create({
    baseURL: 'https://fruit-website.firebaseio.com/'
});

export default instance;