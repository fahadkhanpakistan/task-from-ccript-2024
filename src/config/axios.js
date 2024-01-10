// let token = "";

import axios from "axios";

export const getNewToken = (token) => {
  let interval = () =>
    setInterval(async () => {
      // Your logic to execute at the interval
      const response = await axios.post(
        "https://hiring-test-task.vercel.app/api/refresh-token",
        {
          Authorization: token,
        }
      );
      console.log("resp", response);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data.newToken,
        })
      );
      return response;
    }, 10 * 60 * 1000);
  return interval;
  // clearInterval(interval);
};
