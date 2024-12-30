import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { passwordRegex, phoneRegex } from "../config/regex";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("first Name length must be at least 2 characters long")
        .min(2),

      lastName: yup.string().required("Last Name is required"),

      phone: yup
        .string()
        .required()
        .matches(phoneRegex, "Phone number must be exactly 10 digits")
        .length(10, "Phone number must be exactly 10 digits"),

      email: yup.string().required("Email must be a valid mail").email(),

      password: yup
        .string()
        .required()
        .min(9, "Password to short! Should be at least 9 characters")
        .matches(
          passwordRegex,
          "Password must include one letter, one number, and one special character"
        ),
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
          {/* First Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="John Doe"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="firstName">First Name</label>
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-danger">{formik.errors.firstName}</p>
            )}
          </div>

          {/* Middle Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="middleName"
              placeholder="Middle Name"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="middleName">Middle Name</label>
          </div>

          {/* Last Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="lastName">Last Name</label>
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-danger">{formik.errors.lastName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="phone">Phone Number</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          {/* Email */}
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
            <label htmlFor="email">Email Address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              placeholder="Image URL"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="imageUrl">Image URL</label>
          </div>

          {/* Address Fields */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="street">Street</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="city">City</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="state">State</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="country">Country</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="houseNumber"
              placeholder="House Number"
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="houseNumber">House Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder="Zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="zip">Zip Code</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={!formik.dirty || !formik.isValid}
          >
            Register
          </button>
          <Link to="/login">Already have an account? Login</Link>
        </form>
      </div>
    </>
  );
}

export default Register;
