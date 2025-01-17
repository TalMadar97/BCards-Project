import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  passwordRegex,
  phoneRegex,
  positiveNumberRegex,
} from "../config/regex";
import axios from "axios";
import { baseUrl } from "../config/api";
import { toast } from "react-toastify";

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
      street: "",
      city: "",
      state: "",
      country: "",
      houseNumber: "",
      zip: "",
      isBusiness: false,
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name should be at least 2 characters"),
      lastName: yup.string().required("Last Name is required"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          phoneRegex,
          "Phone number must contain only digits and start with 0"
        )
        .min(9, "Phone number must be at least 9 digits")
        .max(11, "Phone number must be at most 11 digits"),
      email: yup
        .string()
        .required("Email must be a valid mail")
        .email("Email is not valid"),
      password: yup
        .string()
        .required("Password is required")
        .min(9, "Password should be at least 9 characters")
        .matches(
          passwordRegex,
          "Password must include one letter, one number, and one special character"
        ),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      street: yup.string().required("Street is required"),
      houseNumber: yup
        .string()
        .required("House Number is required")
        .min(1)
        .matches(
          positiveNumberRegex,
          "House number must contain positive numbers"
        ),
      zip: yup.number().required("Zip code is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = { ...values };

        payload.name = {
          first: values.firstName,
          middle: values.middleName,
          last: values.lastName,
        };

        payload.address = {
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
          houseNumber: values.houseNumber,
          zip: values.zip,
        };

        payload.image = {
          url: values.imageUrl,
          alt: values.imageAlt,
        };

        delete payload.firstName;
        delete payload.middleName;
        delete payload.lastName;
        delete payload.street;
        delete payload.city;
        delete payload.state;
        delete payload.country;
        delete payload.houseNumber;
        delete payload.zip;
        delete payload.imageUrl;
        delete payload.imageAlt;

        const response = await axios.post(`${baseUrl}/users`, payload);
        if (response.data) {
          toast.success("Registration successful!", { position: "top-center" });
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Registration failed", { position: "top-center" });
      }
    },
  });

  return (
    <div className="container w-md-50 my-4">
      <h4 className="text display-4 my-4 text-center">Register</h4>
      <form onSubmit={formik.handleSubmit}>
        {/* Row 1: First Name and Middle Name */}
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>

        {/* Row 2: Last Name and Phone */}
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>

        {/* Row 3: Email and Password */}
        <div className="row">
          <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
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
          </div>
        </div>

        {/* Row 4: Image URL and Image Alt */}
        <div className="row">
          <div className="col-md-6">
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
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <p className="text-danger">{formik.errors.imageUrl}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="imageAlt"
                placeholder="Image Alt"
                value={formik.values.imageAlt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="imageAlt">Image ALT</label>
              {formik.touched.imageAlt && formik.errors.imageAlt && (
                <p className="text-danger">{formik.errors.imageAlt}</p>
              )}
            </div>
          </div>
        </div>

        {/* Row 5: Address Fields */}
        <div className="row">
          <div className="col-md-6">
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
              {formik.touched.street && formik.errors.street && (
                <p className="text-danger">{formik.errors.street}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
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
              {formik.touched.city && formik.errors.city && (
                <p className="text-danger">{formik.errors.city}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
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
              {formik.touched.state && formik.errors.state && (
                <p className="text-danger">{formik.errors.state}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
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
              {formik.touched.country && formik.errors.country && (
                <p className="text-danger">{formik.errors.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
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
              {formik.touched.houseNumber && formik.errors.houseNumber && (
                <p className="text-danger">{formik.errors.houseNumber}</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
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
              <label htmlFor="zip">Zip</label>
              {formik.touched.zip && formik.errors.zip && (
                <p className="text-danger">{formik.errors.zip}</p>
              )}
            </div>
          </div>
        </div>

        {/* Row 6: Is Business Checkbox */}
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isBusiness"
                checked={formik.values.isBusiness}
                onChange={formik.handleChange}
              />
              <label className="text form-check-label" htmlFor="isBusiness">
                Is Business
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-100 mb-3"
          disabled={!formik.dirty || !formik.isValid}
        >
          Register
        </button>
        <Link to="/login" className="text">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
