import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setNotifyMessage } from "../lib/atoms";

const schema = Yup.object().shape({
  firstName: Yup.string()
    // .required("First name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  lastName: Yup.string()
    // .required("Last name is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  country: Yup.string()
    // .required("Country is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  city: Yup.string()
    // .required("City is required")
    .min(3, "Must be 3 characters or more")
    .max(32, "Must be 32 characters or less"),

  zipcode: Yup.number()
    .positive("Zipcode must be a positive number")
    .integer(" Zipcode must be an integer")
    // .required("Zipcode is required")
    .typeError("Zipcode must be a number"),
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

function EditUser({ user, closeMe }) {
  const [loading, setLoading] = useState(false);

  // console.log("Auth user: ", user);

  async function updateUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.admin),
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
          window.location.href = "/admin";
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

    await updateUser(values);

    setLoading(false);
  }

  return (
    <div className="bg-[url('/bg.svg')] flex flex-col justify-center items-start pt-4">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: user?.email,
          zipcode: user?.zipcode || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          country: user?.country || "",
          city: user?.city || "",
          allowLogin: user?.isActive || true,
          balance: user.account?.balance || "",
          bonus: user.account?.bonus || "",
          withdrawals: user.account?.withdrawals || "",
          deposits: user.account?.deposits || "",
          dogecoin: user.account?.dogecoin || "",
          bitcoin: user.account?.bitcoin || "",
          ethereum: user.account?.ethereum || "",
          smartchain: user.account?.smartchain || "",
          dateJoined: user.dateJoined || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          // console.log(errors);
          return (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full justify-center items-center  py-6 ">
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
                  <ErrorMessage name="firstName" />
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
                  Balance
                </label>
                <Field
                  type="number"
                  name="balance"
                  className=" field pr-4 w-full "
                  placeholder="Balance"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="balance" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Bonus
                </label>
                <Field
                  type="number"
                  name="bonus"
                  className=" field pr-4 w-full "
                  placeholder="Bonus"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="bonus" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Withdrawals
                </label>
                <Field
                  type="number"
                  name="withdrawals"
                  className=" field pr-4 w-full "
                  placeholder="Total Withdrawals"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="withdrawals" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Deposits
                </label>
                <Field
                  type="number"
                  name="deposits"
                  className=" field pr-4 w-full "
                  placeholder="Total Deposits"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="deposits" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Bitcoin
                </label>
                <Field
                  type="number"
                  name="bitcoin"
                  className=" field pr-4 w-full "
                  placeholder="Bitcoin balance"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="bitcoin" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Ethereum
                </label>
                <Field
                  type="number"
                  name="ethereum"
                  className=" field pr-4 w-full "
                  placeholder="Ethereum balance"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="ethereum" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Binance
                </label>
                <Field
                  type="number"
                  name="smartchain"
                  className=" field pr-4 w-full "
                  placeholder="Binance balance"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="smartchain" />
                </p>
              </div>

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Dogecoin
                </label>
                <Field
                  type="number"
                  name="dogecoin"
                  className=" field pr-4 w-full "
                  placeholder="Dogecoin balance"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="dogecoin" />
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

              <div className="w-full">
                <label className="text-base text-left text-white capitalize pb-2 block">
                  Date Joined
                </label>

                <p className="pb-2">
                  {" "}
                  Current Date:{" "}
                  {user.dateJoined &&
                    new Date(user.dateJoined).toLocaleString()}{" "}
                </p>
                <Field
                  type="datetime-local"
                  name="dateJoined"
                  className=" field pr-4 w-full "
                  placeholder="Date Joined"
                />

                <p className="text-red-400 text-sm pt-2">
                  <ErrorMessage name="dateJoined" />
                </p>
              </div>

              <div className=" flex flex-row justify-start space-x-4 items-center">
                <Field
                  type="checkbox"
                  name="allowLogin"
                  className="self-center   "
                />
                <label className="text-base text-left text-white self-center capitalize pb-2 block">
                  Allow Log In
                </label>
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

export default EditUser;
