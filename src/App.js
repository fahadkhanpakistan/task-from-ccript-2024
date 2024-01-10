import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

// pages & components
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { getNewToken } from "./config/axios";
import { useAuthContext } from "./utility-hooks/useAuthContext";
axios.defaults.baseURL = "https://hiring-test-task.vercel.app/api/";

function App() {
  const { user } = useAuthContext();

  useEffect(async () => {
    let resp = getNewToken(user?.token);

    console.log("Resp", resp());
  }, []);

  axios.interceptors.request.use(
    async function (config) {
      // token = user?.token;
      // Do something before request is sent
      // if (
      //   config.url === "https://hiring-test-task.vercel.app/api/refresh-token"
      // ) {
      //   return config;
      // }

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
      // if (error?.response?.status === 401) {
      //   // alert("Refresh token has issue, giving 400, so logging out");
      //   // setTimeout(() => {
      //   //   logout();
      //   // }, [2000]);

      //   const response = await axios.post(
      //     "https://hiring-test-task.vercel.app/api/refresh-token",
      //     {
      //       Authorization:
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmltbWVkVXNlcm5hbWUiOiJzdHJpbmciLCJpYXQiOjE3MDQ4OTE3NDAsImV4cCI6MTcwNDg5MjM0MH0.cQHKh_mmOy6H_w7EMNyEK1_QkARfyMOrChCu8vFnzEs",
      //     }
      //     // {
      //     //   headers: { Authorization: `Bearer ${user.token}` },
      //     //   withCredentials: true,
      //     // }
      //   );
      //   console.log("JSON-refresh", response);

      //   if (response.status === 200) {
      //     axios.defaults.headers.common[
      //       "Authorization"
      //     ] = `Bearer ${response.data["token"]}`;

      //     return axios(error.config);
      //   }
      // }
      // refresh = false;
      return error;
    }
  );

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Appointments /> : <Navigate to="/login" />}
            />
            <Route
              path="/appointments"
              element={user ? <Appointments /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/appointments" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
