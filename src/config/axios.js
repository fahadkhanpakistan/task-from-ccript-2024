import axios from "axios";
axios.defaults.baseURL = "https://hiring-test-task.vercel.app/api/";

let refresh = false;
const user = JSON.parse(localStorage.getItem("user"));

axios.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    console.log(user);

    if (user) {
      config.headers.Authorization = `Bearer ${user?.token}`;
      return config;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    console.log("error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log("check", error);

    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(user.token);
      const response = await axios.post(
        "/refresh-token",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );
      console.log("JSON", response);

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
