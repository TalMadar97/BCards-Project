import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { phoneRegex } from "../config/regex";
import axios from "axios";
import { baseUrl } from "../config/api";
import { toast } from "react-toastify";

function CreateNewCard() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      imageUrl: "",
      imageAlt: "",
      street: "",
      city: "",
      state: "",
      country: "",
      houseNumber: "",
      zip: "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Title is required")
        .min(2, "Title should be at least 2 characters")
        .max(256, "Title should be Max 256 characters"),

      subtitle: yup
        .string()
        .required("Subtitle is required")
        .min(2, "Title should be at least 2 characters")
        .max(256, "Title should be Max 256 characters"),

      description: yup
        .string()
        .required("Description is required")
        .min(2, "Title should be at least 2 characters")
        .max(256, "Title should be Max 256 characters"),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(phoneRegex, "Phone number must contain only digits")
        .min(9, "Phone number must be at least 9 digits")
        .max(11, "Phone number must be at most 11 digits"),

      email: yup
        .string()
        .required("Email must be a valid mail")
        .email("Email is not valid"),

      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      street: yup.string().required("Street is required"),
      houseNumber: yup.string().required("house Number is required").min(1),
      zip: yup.number().required("Zip code is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = { ...values };

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

        const response = await axios.post(`${baseUrl}/cards`, payload);
        if (response.data) {
          toast.success("Card Was Added Successfuly", {
            position: "top-center",
          });
          navigate("/myCards");
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to add card", { position: "top-center" });
      }
    },
  });

  return (
    <>
      <div className="text text-center mb-4 my-4">
        <h1>Add A Business Card</h1>
        <p className="text-center mb-4">
          Here you can add business cards to your collection
        </p>
      </div>

      <div className="container w-md-50">
        <form onSubmit={formik.handleSubmit}>
          {/* Row 1: Title and Subtitle */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="title">Title</label>
                {formik.touched.title && formik.errors.title && (
                  <p className="text-danger">{formik.errors.title}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="subtitle"
                  placeholder="Subtitle"
                  value={formik.values.subtitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="subtitle">Subtitle</label>
              </div>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="row">
            <div className="col-md-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="description">Description</label>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-danger">{formik.errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Email and Phone */}
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
                  type="phone"
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
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

          {/* Row 2: Web */}
          <div className="row">
            <div className="col-md-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="web"
                  placeholder="Web"
                  value={formik.values.web}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="description">Web</label>
                {formik.touched.web && formik.errors.web && (
                  <p className="text-danger">{formik.errors.web}</p>
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
                <label htmlFor="imageAlt">Image Alt</label>
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
                  placeholder="Zip Code"
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

          <button
            type="submit"
            className="w-100 mb-3"
            disabled={!formik.dirty || !formik.isValid}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNewCard;
