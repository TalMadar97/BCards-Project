import { useFormik } from "formik";
import * as yup from "yup";
import { passwordRegex } from "../config/regex";
import axios from "axios";
import { baseUrl } from "../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
          localStorage.setItem("token", token);
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
      <h1>Login</h1>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          autoComplete="on"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-danger">{formik.errors.email}</p>
        )}

        <br />

        <input
          type="password"
          autoComplete="on"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-danger">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className="btn btn-dark"
          disabled={!formik.dirty || !formik.isValid}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
