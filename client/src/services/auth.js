import Http from '@/providers/http';
// import Store from '@/store';

const API_URL = 'http://localhost:8081/api/users';
const Auth = {
  login(credentials) {
    return Http({ method: 'post', url: `${API_URL}/login`, data: credentials });
  },
  register(credentials) {
    return Http({ method: 'post', url: `${API_URL}/register`, data: credentials });
  },
  setToken(token) {
    localStorage.setItem('token', token);
  },
  getToken() {
    return localStorage.getItem('token');
  },
  removeToken() {
    localStorage.removeItem('token');
  },
  setProfile(profileObject) {
    const user = JSON.stringify(profileObject);
    localStorage.setItem('profile', user);
  },
  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  },
  removeProfile() {
    localStorage.removeItem('profile');
  },
  logout() {
    this.removeProfile();
    this.removeToken();
  },
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  },
};

export default Auth;
