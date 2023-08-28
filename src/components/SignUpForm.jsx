import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
  password1: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),

  password2: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password1 === value;
    }),
});

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function createUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.createUser),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Account created successfully",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/sign-in";
          // redirect('/sign-in')
        },
        onAcceptText: "Sign In",
      });
    } else {
      setError("Something went wrong");
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
    setError(null);
    setUser(null);

    await createUser(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-center mt-8">
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-8  max-w-md lg:bg-text1/10 px-16 py-12 rounded">
              <legend className="text-center text-text1 font-bold text-2xl lg:text-3xl py-4">
                Register a new account
              </legend>
              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
              </div>

              <div className="w-full">
                <Field
                  type="text"
                  name="firstName"
                  className=" field w-full "
                  placeholder="First Name"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="firstName" />
                </p>
              </div>

              <div className="w-full">
                <Field
                  type="text"
                  name="lastName"
                  className=" field w-full "
                  placeholder="Last Name"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="lastName" />
                </p>
              </div>
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
                  placeholder="Password"
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
                  placeholder="Confirm Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password2" />
                </p>
              </div>

              <p className="text-sm">
                {" "}
                Already have an account?{" "}
                <a className="underline" href="/sign-in">
                  Sign In
                </a>{" "}
              </p>

              <div className="w-[80%] mt-8">
                <button
                  disabled={!isValid || loading}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  {loading ? <Spinner size="tiny" /> : "Sign Up"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignInForm;
