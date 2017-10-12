import axios from 'axios';
// import store from '@/store';

axios.defaults.headers.common['Authorization-Token'] = localStorage.getItem('token') || '';

export default axios;
