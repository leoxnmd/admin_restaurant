import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getRoleList = async() =>{
    const response = await axios.get(`${base_url}user/owner/list`,config);
    return response.data.data;
};
const getRolesById = async(id) =>{
    const response = await axios.get(`${base_url}user/owner/get/${id}`,config);
    return response.data.data;

};

const RoleService = {
    getRoleList,
    getRolesById,

}
export default RoleService;