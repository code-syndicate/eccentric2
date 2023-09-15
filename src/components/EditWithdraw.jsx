import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

function EditWithdraw({ data, closeMe }) {
  const [loading, setLoading] = useState(false);

  // console.log("Auth user: ", user);

  async function updateW(values) {
    values = {
      ...values,
      id: data._id,
    };

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminWithdraw),
      method: "PUT",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Details updated successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=1";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res.error?.message,
        allowclose: true,
      });
    }
  }

  async function handleSubmit(values) {
    setLoading(true);

    await updateW(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-start pt-4">
      <p> Edit withdrawal with ID {data._id} </p>

      <Formik
        validationSchema={schema}
        initialValues={{
          email: data.user?.email,
          date: data?.date || "",
          amount: data?.amount || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          // console.log(errors);
          return (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full justify-center items-center  py-6 ">
              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Email Address
                </label>
                <Field
                  readOnly
                  type="email"
                  disabled
                  name="email"
                  className=" field pr-4 w-full "
                  placeholder="Email Address"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Amount
                </label>
                <Field
                  type="number"
                  name="amount"
                  className=" field pr-4 w-full "
                  placeholder="Amount"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="amount" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Date Created
                </label>

                <p className="pb-2">
                  {" "}
                  Current Date:{" "}
                  {data.date && new Date(data.date).toLocaleString()}{" "}
                </p>
                <Field
                  type="datetime-local"
                  name="date"
                  className=" field pr-4 w-full "
                  placeholder="Date"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="date" />
                </p>
              </div>

              <div className="w-[80%] mt-8 flex flex-col justify-center items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 lg:justify-between">
                <button
                  disabled={!isValid || loading}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Update"}
                </button>

                <button
                  disabled={loading}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="button"
                  role="button"
                  onClick={closeMe}
                >
                  Close
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default EditWithdraw;
