import axios from "axios";
const inDev = process.env.PORT === 3000;

const hyperlocusApi = axios.create({
  baseURL: inDev?"http://localhost:8080":"http://hyperlocus-server.herokuapp.com/",
  withCredentials: true
  //baseURL: "http://hyperlocus-server.herokuapp.com/"
});

export async function postLogin(username, password) {
  try {
    const res = await hyperlocusApi.post("/auth/login", {
      username: username,
      password: password
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
