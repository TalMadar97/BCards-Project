import { useFormik } from "formik";
import * as yup from "yup";
import { passwordRegex } from "../config/regex";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../config/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import cacheUtils from "../utils/cache";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .min(8, "Password to short! Should be at least 8 characters")
        .matches(
          passwordRegex,
          "Password must include one letter, one number, and one special character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseUrl}/users/login`, values);

        const token = response.data;
        if (token) {
          cacheUtils.setToken(token);
          const user = jwtDecode(token);
          cacheUtils.setUser(user);
          navigate("/");
        }

        console.log("Response Data:", response.data);
        toast.success("Login successful!", { position: "top-center" });
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Login failed", { position: "top-center" });
      }
    },
  });

  return (
    <>
      <div className="container w-25">
        <h1 className="display-4 my-4 text-center">Login</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              autoComplete="on"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email Address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              autoComplete="on"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
            Login
          </button>
          <Link to="/register">Don't Have An Account? Register</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
