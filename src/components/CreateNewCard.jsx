import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { phoneRegex } from "../config/regex";
import axios from "axios";
import { baseUrl } from "../config/api";
import { toast } from "react-toastify";
import { createCard } from "../services/api";

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
      image: { url: "", alt: "" },
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        houseNumber: "",
        zip: "",
      },
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

      address: yup.object({
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
        street: yup.string().required("Street is required"),
        houseNumber: yup.string().required("house Number is required").min(1),
        zip: yup.number().required("Zip code is required"),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const payload = { ...values };
        const card = await createCard(payload);

        if (card) {
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
                  id="image.url"
                  placeholder="Image URL"
                  value={formik.values.image?.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="image.url">Image URL</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="image.alt"
                  placeholder="Image Alt"
                  value={formik.values.image?.alt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="image.alt">Image Alt</label>
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
                  id="address.street"
                  placeholder="Street"
                  value={formik.values.address?.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.street">Street</label>
                {formik.touched.address?.street &&
                  formik.errors.address?.street && (
                    <p className="text-danger">
                      {formik.errors.address?.street}
                    </p>
                  )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address.city"
                  placeholder="City"
                  value={formik.values.address?.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.city">City</label>
                {formik.touched.address?.city &&
                  formik.errors.address?.city && (
                    <p className="text-danger">{formik.errors.address?.city}</p>
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
                  id="address.state"
                  placeholder="State"
                  value={formik.values.address?.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.state">State</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address.country"
                  placeholder="Country"
                  value={formik.values.address?.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.country">Country</label>
                {formik.touched.address?.country &&
                  formik.errors.address?.country && (
                    <p className="text-danger">
                      {formik.errors.address?.country}
                    </p>
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
                  id="address.houseNumber"
                  placeholder="House Number"
                  value={formik.values.address?.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.houseNumber">House Number</label>
                {formik.touched.address?.houseNumber &&
                  formik.errors.address?.houseNumber && (
                    <p className="text-danger">
                      {formik.errors.address?.houseNumber}
                    </p>
                  )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address.zip"
                  placeholder="Zip Code"
                  value={formik.values.address?.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="address.zip">Zip</label>
                {formik.touched.address?.zip && formik.errors.address?.zip && (
                  <p className="text-danger">{formik.errors.address?.zip}</p>
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
