// THIS IS FROM CAT COLLECTOR FRONT END, RAUL SEPERATED THE CONCERNS OF GETTTING/USING TOKENS HERE, NEED TO ASK HIM OR CHRIS WHAT IS HAPPENING HERE.
// WE MIGHT NEED TO CUSTOMIZE THIS TO WORK FOR OUR FRONT END - GABE

import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://your-deployed-app.herokuapp.com"
      : "http://localhost:8000/api",
});

api.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;