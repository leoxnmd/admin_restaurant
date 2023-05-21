import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import jwt_decode from "jwt-decode";
const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);

  const loginFail = "errorCodes" in response.data;

  if (!loginFail) {
    const decodeToken = jwt_decode(response.data.data.token);
    const roles = decodeToken.roles;
    const checkAuthorization =
      roles.includes("OWNER") || roles.includes("STAFF") ? true : false;

    if (checkAuthorization) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data.data;
    }
    throw new Error("Đăng nhập thất bại! Bạn không đủ quyền truy cập");
  }
  throw new Error("Đăng nhập thất bại! Sai tài khoản mật khẩu");
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
