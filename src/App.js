import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./utility-hooks/useAuthContext";

// pages & components
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import axios from "axios";
import { useLogout } from "./utility-hooks/useLogout";

function App() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  axios.defaults.baseURL = "https://hiring-test-task.vercel.app/api/";

  let refresh = false;
  // const user = JSON.parse(localStorage.getItem("user"));

  axios.interceptors.request.use(
    async function (config) {
      // Do something before request is sent

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
        alert("Refresh token has issue, giving 400, so logging out");
        setTimeout(() => {
          logout();
        }, [2000]);

        refresh = true;
        console.log(user.token);
        const response = await axios.post(
          "/refresh-token",
          {},
          {
            // headers: { Authorization: `Bearer ${user.token}` },
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
