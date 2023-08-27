import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
  password: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),
});

function SignInForm() {
  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-center">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="flex flex-col justify-center items-center space-y-8 mt-32 max-w-md lg:bg-text1/10 px-16 py-12 rounded">
              <legend className="text-center text-text1 font-bold text-2xl lg:text-3xl py-4">
                {" "}
                Sign in to your account{" "}
              </legend>
              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
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
                  name="password"
                  className="field w-full"
                  placeholder="Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password" />
                </p>

                <a
                  className="text-sm text-blue-500 text-left"
                  href="/reset-password"
                >
                  Forgot password?
                </a>
              </div>

              <p className="text-sm">
                New here?
                <a className="underline" href="/sign-up">
                  {" "}
                  Create account
                </a>{" "}
              </p>

              <div className="w-[80%] mt-8">
                <button
                  disabled={!isValid}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  Sign In
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
