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

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);

  async function resetPassword(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.resetPassword),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content:
          "We have sent a follow up link to your email inbox. The link expires in 10 minutes.",
        allowClose: false,
        onAcceptText: "OK",
        onAccept() {
          location.href = "/";
        },
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

    await resetPassword(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-center">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-6 mt-32 max-w-md lg:bg-text1/10 px-16 py-12 rounded">
              <legend className="text-center text-text1 font-bold text-2xl lg:text-3xl pt-4">
                Reset your password
              </legend>
              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
              </div>

              <p className="text-sm font-normal py-2  text-center pt-4">
                {" "}
                Fill in the following details to reset your password. We will
                send further instructions to your email inbox to complete the
                reset process.
                <br />
                <br />
                Any previous reset attempts will be nullified by a new attempt.
              </p>

              <div className="w-full">
                <Field
                  type="email"
                  name="email"
                  className=" field w-full "
                  placeholder="Email Address"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password1"
                  className="field w-full"
                  placeholder="Enter new password"
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
                  placeholder="Confirm new password"
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
                  {loading ? <Spinner size="tiny" /> : "Proceed"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ResetPasswordForm;
