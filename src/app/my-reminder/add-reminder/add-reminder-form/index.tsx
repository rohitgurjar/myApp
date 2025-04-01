import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import FormInput from "@/app/components/FormInput";
import DateDropdown from "@/app/components/date-picker";
import { showToast } from "@/app/components/toaster";
import { useRouter } from "next/navigation";

interface handleCloseType {
  handleClose: () => void;
  reminderCategoryId: any;
  token: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reminderListData: any;
}

interface TicketType {
  firstName: string;
  lastName: string;
  emailAddress: string;
  reminderName: string;
  moreDetail: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  reminderName: Yup.string(),
  moreDetail: Yup.string(),
});

const AddReminderForm = ({
  handleClose,
  reminderCategoryId,
  token,
  setIsOpen,
  reminderListData,
}: handleCloseType) => {
  const [selectedDate, setSelectedDate] = React.useState<string>("");

  const router = useRouter();

  React.useEffect(() => {
    if (reminderListData) {
      setSelectedDate(reminderListData.reminderDate);
    } else {
      setSelectedDate(selectedDate);
    }
  }, []);

  const formik = useFormik<TicketType>({
    initialValues: {
      firstName: reminderListData?.firstName ?? "",
      lastName: reminderListData?.lastName ?? "",
      emailAddress: reminderListData?.emailAddress ?? "",

      ...(reminderCategoryId.reminderCategoryShortcode === "ANNIVERSARY"
        ? { reminderName: reminderListData?.reminderName ?? "" }
        : {}),
      // reminderName: reminderListData?.reminderName ?? "",
      moreDetail: reminderListData?.moreDetail ?? "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://172.16.1.130/api/v1/Reminder/AddUpdateReminder",
          {
            method: "POST",
            mode: "cors",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reminderCategoryId: reminderCategoryId.reminderCategoryId,
              reminderDate: selectedDate,

              ...(reminderListData?.reminderId
                ? { reminderId: reminderListData.reminderId }
                : {}),
              ...values,
            }),
          }
        );

        const data = await response.json();

        if (data.code === 200) {
          setIsOpen(false);
          showToast("Reminder add Successfully", "success");
          router.refresh();
        }
      } catch (error) {
        console.error("Error during registration:", error);
        showToast(error, "error");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-xl text-center font-bold mb-4">
          {reminderListData ? "Edit" : "Add"}{" "}
          {reminderCategoryId.reminderCategoryDescription}
        </h2>

        {/* Input Fields */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="mb-4">
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              required
            />
          </div>

          <div className="mb-4">
            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              required
            />
          </div>

          <div>
            <FormInput
              label="Email"
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailAddress}
              error={formik.errors.emailAddress}
              touched={formik.touched.emailAddress}
              required
            />
          </div>
          {reminderCategoryId.reminderCategoryShortcode === "ANNIVERSARY" && (
            <div className="mb-4">
              <FormInput
                label="Anniversary Name"
                type="text"
                id="reminderName"
                name="reminderName"
                placeholder="Enter your Anniversary Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reminderName}
                error={formik.errors.reminderName}
                touched={formik.touched.reminderName}
              />
            </div>
          )}

          <div>
            <DateDropdown
              label={
                reminderCategoryId.reminderCategoryShortcode === "ANNIVERSARY"
                  ? "ANNIVERSARY"
                  : "Birthday"
              }
              onChange={setSelectedDate}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>

          <div className="mb-4">
            <FormInput
              label="More Detail"
              type="text"
              id="moreDetail"
              name="moreDetail"
              placeholder="Enter your More Detail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.moreDetail}
              error={formik.errors.moreDetail}
              touched={formik.touched.moreDetail}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => handleClose()}
              className="px-4 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminderForm;
