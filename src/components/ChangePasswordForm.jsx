import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Current Password is required"),

  password1: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("New Password is required"),

  password2: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("New Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password1 === value;
    }),
});

function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);

  async function changePassword(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.changePassword),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Password changed successfully.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/sign-in";
          // redirect('/sign-in')
        },
        onAcceptText: "Proceed to log in",
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

    await changePassword(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-center">
      <Formik
        validationSchema={schema}
        initialValues={{
          password: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-8 mt-32 max-w-md lg:bg-text1/10 px-16 py-12 rounded">
              <legend className="text-center text-text1 font-bold text-2xl lg:text-3xl pt-4">
                Change your password
                <p className="text-sm font-normal py-2  text-center">
                  {" "}
                  Enter a new password to change your password.
                </p>
              </legend>

              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password"
                  className="field w-full"
                  placeholder="Current Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password" />
                </p>
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password1"
                  className="field w-full"
                  placeholder="New Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password1" />
                </p>
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password2"
                  className="field w-full"
                  placeholder="Confirm New Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password2" />
                </p>
              </div>

              <p className="text-sm">
                New here?
                <a className="underline" href="/sign-up">
                  {" "}
                  Sign up{" "}
                </a>{" "}
              </p>

              <div className="w-[80%] mt-8">
                <button
                  disabled={!isValid || loading}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Submit"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;
