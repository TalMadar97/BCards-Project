import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../services/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { phoneRegex, positiveNumberRegex, urlRegex } from "../../config/regex";
import { updateProfile as callUpdateProfile } from "../../services/api";
import Loading from "../Loading";

function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(id);
        const data = response.data;
        formik.setValues(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch card details", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },

      phone: "",

      image: {
        url: "",
        alt: "",
      },

      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        houseNumber: "",
        zip: "",
      },

      isBusiness: false,
    },
    validationSchema: yup.object({
      name: yup.object({
        first: yup
          .string()
          .required("First Name is required")
          .min(2, "First Name should be at least 2 characters"),
        last: yup.string().required("Last Name is required"),
        middle: yup.string(),
      }),
      address: yup.object({
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

      image: yup.object({
        url: yup.string().matches(urlRegex, "Please enter a valid URL"),
        alt: yup
          .string()
          .min(2, "Image Alt text should be at least 2 characters"),
      }),

      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          phoneRegex,
          "Phone number must contain only digits and start with 0"
        )
        .min(9, "Phone number must be at least 9 digits")
        .max(11, "Phone number must be at most 11 digits"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          name: {
            ...values.name,
          },
          address: {
            ...values.address,
          },
          image: {
            ...values.image,
          },
          phone: values.phone,
        };

        if (payload.address?._id) {
          delete payload.address?._id;
        }

        if (payload.name?._id) {
          delete payload.name?._id;
        }

        if (payload.image?._id) {
          delete payload.image?._id;
        }

        const response = await callUpdateProfile(id, payload);
        if (response.data) {
          toast.success("Profile Updated successfully!", {
            position: "top-center",
          });
          navigate("/profile");
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response?.data : error.message
        );
        toast.error("Failed to update profile", { position: "top-center" });
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-md-50">
      <h4 className="text display-4 my-4 text-center">Update</h4>
      <form onSubmit={formik.handleSubmit}>
        {/* Row 1: First Name and Middle Name */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name.first"
                placeholder="John Doe"
                value={formik.values.name?.first}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name.first">First Name</label>
              {formik.touched.name?.first && formik.errors.name?.first && (
                <p className="text-danger">{formik.errors.name?.first}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name.middle"
                placeholder="Middle Name"
                value={formik.values.name?.middle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name.middle">Middle Name</label>
              {formik.touched.name?.middle && formik.errors.name?.middle && (
                <p className="text-danger">{formik.errors.name?.middle}</p>
              )}
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
                id="name.last"
                placeholder="Doe"
                value={formik.values.name?.last}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name.last">Last Name</label>
              {formik.touched.name?.last && formik.errors.name?.last && (
                <p className="text-danger">{formik.errors.name?.last}</p>
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
              {formik.touched.image?.url && formik.errors.image?.url && (
                <p className="text-danger">{formik.errors.image?.url}</p>
              )}
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
              <label htmlFor="image.alt">Image ALT</label>
              {formik.touched.image?.alt && formik.errors.image?.alt && (
                <p className="text-danger">{formik.errors.image?.alt}</p>
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
                id="address.street"
                placeholder="Street"
                value={formik.values.address?.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="address.street">Street</label>
              {formik.touched.address?.street &&
                formik.errors.address?.street && (
                  <p className="text-danger">{formik.errors.address?.street}</p>
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
              {formik.touched.address?.city && formik.errors.address?.city && (
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
              {formik.touched.address?.state &&
                formik.errors.address?.state && (
                  <p className="text-danger">{formik.errors.address?.state}</p>
                )}
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
                disabled={true}
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
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
