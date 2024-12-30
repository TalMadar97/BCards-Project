import { useFormik } from "formik";
import * as yup from "yup";
import { passwordRegex } from "../config/regex";

function Login() {
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
    onSubmit: (values) => {
      console.log(values);
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
