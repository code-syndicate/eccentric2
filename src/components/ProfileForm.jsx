import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
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
  password: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),
});

function ProfileForm() {
  const [loading, setLoading] = useState(false);

  async function loginUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.logIn),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Log in successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/dashboard";
          // redirect('/sign-in')
        },
        onAcceptText: "Proceed to dashboard",
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

    await loginUser(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-start pt-4">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="grid grid-cols-2 gap-x-8 gap-y-4 w-full justify-center items-center  py-6 ">
              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className=" field pr-4  w-full "
                  placeholder="First Name"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className=" field pr-4 w-full "
                  placeholder="Last Name"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="lastName" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Email Address
                </label>
                <Field
                  type="email"
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
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  className=" field pr-4 w-full "
                  placeholder="Country"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="country" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  className=" field pr-4 w-full "
                  placeholder="City"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="city" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Zip Code
                </label>
                <Field
                  type="text"
                  name="zipcode"
                  className=" field pr-4 w-full "
                  placeholder="Zip Code"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="zipcode" />
                </p>
              </div>

              <div className="w-[80%] mt-8">
                <button
                  disabled={!isValid || loading}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Update"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProfileForm;
