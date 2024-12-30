import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
// import { addUser, checkUserExsis } from "../services/UserService";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    }),
    onSubmit: (values) => {
      checkUserExsis(values)
        .then((res) => {
          if (res.data.length) {
            alert("Email Already Exsist, Please try Login");
          } else {
            addUser({ ...values, isAdmin: false })
              .then((res) => {
                navigate("/home");
                localStorage.setItem("userId", JSON.stringify(res.data.id));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <div className="container w-25">
        <h4 className="display-4 my-2">Register</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Jone Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Name</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email Address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={!formik.dirty || !formik.isValid}
          >
            Register
          </button>
          <Link to="/login">Already have an account ? Login</Link>
        </form>
      </div>
    </>
  );
}

export default Register;
