import axios from 'axios';

const apiUrl = "http://localhost:5233/"

axios.defaults.baseURL = apiUrl


axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    if (error.status == 401) {
      window.location.href = "/login"
    }
    else
      return Promise.reject(error);
  }
);

export default
  {

    login: async (user) => {
      const result = await axios.post("users/login", user)
      sessionStorage.setItem("userId", result.data)
      return await result.data
    },

    register: async (user) => {
      const result = await axios.post("users/register", user)
      sessionStorage.setItem("userId", result.data)
      return await result.data
    },

    getTasks: async () => {
      const result = await axios.get(`tasks/${sessionStorage.getItem("userId")}`)
      return await result.data;
    },

    addTask: async (name) => {
      console.log('addTask', name)
      const result = await axios.post(`tasks/${sessionStorage.getItem("userId")}`, { name: name, isComplete: false })
      return await result.data;
    },

    setCompleted: async (id, isComplete) => {
      console.log('setCompleted', { id, isComplete })
      const result = await axios.put(`tasks/${sessionStorage.getItem("userId")}/${id}?IsComplete=${isComplete}`)
      return await result.data;
    },

    deleteTask: async (id) => {
      console.log('deleteTask')
      await axios.delete(`tasks/${sessionStorage.getItem("userId")}/${id}`)
    }
  };
