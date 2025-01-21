"use client";

import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import SelectDropdown from "@/app/components/SelectInput";
import FormInput from "@/app/components/FormInput";

// Define the types for the user info structure
type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
};

type User = {
  user: {
    info: UserInfo;
    jwtToken: string;
  };
};

type ProfileEditFormProps = {
  user: User;
};

type Country = {
  value: number;
  label: string;
};

const CountryData: Country[] = [
  { value: 189, label: "Nigeria" },
  { value: 208, label: "India" },
  { value: 9, label: "United Kingdom" },
];

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const formik = useFormik({
    initialValues: {
      firstName: user.user.info.firstName || "",
      lastName: user.user.info.lastName || "",
      emailAddress: user.user.info.email || "",
      countryId: user.user.info.countryId || "",
      addressLine1: user.user.info.addressLine1 || "",
      addressLine2: user.user.info.addressLine2 || "",
      city: user.user.info.city || "",
      postCode: user.user.info.postalCode || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      emailAddress: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      countryId: Yup.number().required("Country is required"),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().required("Address Line 2 is required"),
      city: Yup.string().required("City is required"),
      postCode: Yup.string().required("Postal code is required"),
    }),
    onSubmit: async (values) => {
      // You can call an API to update the profile here
      try {
        const response = await fetch(
          "https://dev-api.whytelion.com/ticketsirdotnet/api/v1/Account/UpdateUserProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.user.jwtToken}`, // Add the token here
            },

            body: JSON.stringify({
              ...values,
              userId: user.user.info.id,
              isapplogin: false,
            }), // Send form data as JSON
          }
        );

        const data = await response.json();

        if (data.responceCode === 200) {
          alert(data.message);
        }

        // Handle the response (e.g., redirect to login or show success message)
      } catch (error) {
        console.error("Error during profile update:", error);
        alert(error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-300">
          Personal Profile
        </h3>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
            />
          </div>
          <div>
            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              required
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
            />
          </div>
        </div>

        <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-300">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="Email"
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Enter your email"
              required
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.emailAddress}
              touched={formik.touched.emailAddress}
              disabled
            />
          </div>
          <div>
            <SelectDropdown
              label="Country"
              id="countryId"
              name="countryId"
              options={CountryData}
              value={formik.values.countryId}
              onChange={formik.handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="Address Line 1"
              type="text"
              id="addressLine1"
              name="addressLine1"
              placeholder="Enter your Address Line 1"
              required
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.addressLine1}
              touched={formik.touched.addressLine1}
            />
          </div>
          <div>
            <FormInput
              label="Address Line 2"
              type="text"
              id="addressLine2"
              name="addressLine2"
              placeholder="Enter your Address Line 2"
              required
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.addressLine2}
              touched={formik.touched.addressLine2}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormInput
              label="City"
              type="text"
              id="city"
              name="city"
              placeholder="Enter your City"
              required
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.city}
              touched={formik.touched.city}
            />
          </div>
          <div>
            <FormInput
              label="Postal Code"
              type="text"
              id="postCode"
              name="postCode"
              placeholder="Enter your Postal Code"
              required
              value={formik.values.postCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.postCode}
              touched={formik.touched.postCode}
            />
          </div>
        </div>

        <div className="flex items-center justify-center !mt-10">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileEditForm;
