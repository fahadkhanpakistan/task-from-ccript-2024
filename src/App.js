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
