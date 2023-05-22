import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStaffById } from "../features/staff/staffSlice";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";

const DetailStaff = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStaffById(id));
  }, [dispatch, id]);

  const staff = useSelector((state) => state.staff.createdProduct);
  console.log(staff);
  // const { isSuccess, isError, isLoading } = useSelector(
  //   (state) => state.staff.products
  // );

  const formik = useFormik({
    initialValues: {
      name: staff?.name || "",
      phone: staff?.phone || "",
      email: staff?.email || "",
    },
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Staff updated successfully!");
  //   }
  //   if (isError) {
  //     toast.error("Failed to update staff!");
  //   }
  // }, [isSuccess, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Detail Staff</h3>
      <div>
        <form className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            name="name"
            val={formik.values.name}
            disabled = "true"
          />
          <CustomInput
            type="text"
            label="Enter Phone"
            name="phone"
            val={formik.values.phone}
            disabled = "true"
          />
          <CustomInput
            type="text"
            label="Enter Email "
            name="email"
            val={formik.values.email}
            disabled = "true"
          />
        </form>
      </div>
    </div>
  );
};
export default DetailStaff;
