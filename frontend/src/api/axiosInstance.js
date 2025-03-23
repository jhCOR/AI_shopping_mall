import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask 서버 주소
  withCredentials: true,
});

export default instance;
