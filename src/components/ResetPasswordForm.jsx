import { Form, Formik, Field, ErrorMessage } from "formik";
import LogoImage from "../assets/logo.png";
import * as Yup from "yup";

const schema = Yup.object().shape({
  password1: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),

  password2: Yup.string()
    .min(8, " Must be 8 characters or more")
    .required("Password is required"),
});

function ResetPasswordForm() {
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
              <legend className="text-center text-text1 font-bold text-2xl lg:text-3xl pt-4">
                Reset your password
                <p className="text-sm font-normal py-2  text-center">
                  {" "}
                  Enter a new password to complete the reset.
                </p>
              </legend>

              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password1"
                  className="field w-full"
                  placeholder="Password"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="password" />
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
                  <ErrorMessage name="password" />
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
                  disabled={!isValid}
                  className="bg-text1/80 hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                  type="submit"
                  role="form"
                >
                  Submit
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
