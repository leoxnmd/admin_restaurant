import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  const checkLogin = response.data.errorCodes !== undefined ? false : true;
  console.log(checkLogin);
  if (checkLogin) {
    console.log(response.data.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data.data;
  }
  throw new Error("Đăng nhập thất bại");
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
