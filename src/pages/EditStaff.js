import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  getStaffById,
  resetState,
  updateStaff,
} from "../features/staff/staffSlice";
import CustomInput from "../components/CustomInput";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  phone: yup
    .string()
    .matches(/^(08|09|03|05)[0-9]{8}$/, "Invalid phone number")
    .required("Phone is Required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

const EditStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStaffById(id));
  }, [dispatch, id]);

  const staff = useSelector((state) => state.staff.createdProduct);
  console.log(staff);
  const { isSuccess, isError, isLoading } = useSelector(
    (state) => state.staff.products
  );

  const formik = useFormik({
    initialValues: {
      name: staff?.name || "",
      phone: staff?.phone || "",
      email: staff?.email || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(updateStaff({ id, values }));
      formik.resetForm();
      navigate("/admin/staffList");
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Staff updated successfully!");
    }
    if (isError) {
      toast.error("Failed to update staff!");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Edit Staff</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            label="Enter Phone"
            name="phone"
            onChng={formik.handleChange("phone")}
            onBlr={formik.handleBlur("phone")}
            val={formik.values.phone}
          />
          <div className="error">
            {formik.touched.phone && formik.errors.phone}
          </div>
          <CustomInput
            type="text"
            label="Enter Email "
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            type="password"
            label="Enter Password "
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>

          <CustomInput
            type="password"
            label="Enter Confirm Password "
            name="confirmPassword"
            onChng={formik.handleChange("confirmPassword")}
            onBlr={formik.handleBlur("confirmPassword")}
            val={formik.values.confirmPassword}
          />
          <div className="error">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating staff..." : "Update Staff"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditStaff;
