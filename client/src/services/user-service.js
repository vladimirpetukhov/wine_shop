import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/auth';

const userService = {
  login: function (data) {
    return axios
      .post(baseUrl, data, {
        withCredentials: true,
      })
      .catch(console.error);
  },
  register: function (data) {
    return axios
      .post(`${baseUrl}/register`, data, {
        withCredentials: true,
      })
      .catch(console.error);
  },
  logout: function () {
    return axios
      .get(`${baseUrl}/logout`, { withCredentials: true })
      .catch(console.error);
  },
};

export default userService;
