import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import { Slide } from "react-reveal";
import { $walletQr } from "../lib/atoms";
import { useStore } from "@nanostores/react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import Spinner from "./Spinner";
import { setWithdrawPopup, $withdrawPopup } from "../lib/atoms";

const schema = Yup.object().shape({
  bankName: Yup.string()
    .required("Bank name is required")
    .min(3, "Must be 3 characters or more")
    .max(128, "Must be 128 characters or less"),

  swift: Yup.string()
    .required("SWIFT is required")
    .min(3, "Must be 3 characters or more"),

  address: Yup.string()
    .required("Address is required")
    .min(20, "Must be 20 characters or more"),

  channel: Yup.string()
    .required("Payout Mode is required")
    .oneOf(["bank", "crypto"], "Invalid payout mode"),

  wallet: Yup.string()
    .required("Wallet is required")
    .oneOf(["bitcoin", "ethereum"], "Invalid wallet"),

  bankNumber: Yup.number()
    .positive("Bank Number must be a positive number")
    .integer(" Bank Number must be an integer")
    .required("Bank Number is required")
    .typeError("Bank Number must be a number"),

  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

export default function WithdrawPopup({ user }) {
  const [loading, setLoading] = useState(false);

  const { show } = useStore($withdrawPopup);

  async function withdrawReq(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.createUser),
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
          window.location.href = "/settings";
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

    await withdrawReq(values);

    setLoading(false);
  }
  const walletQr = useStore($walletQr);

  //   console.log(state);

  function closeSelf() {
    if (show) {
      setWithdrawPopup({
        show: false,
      });
    }
  }

  if (!show) return null;

  return (
    <Overlay z={3}>
      <Slide
        right
        className="flex w-full flex-row justify-center items-center"
        duration={300}
      >
        {/* <Zoom top right duration="250" className="w-full"> */}
        <div className="w-full bg-background rounded-md space-y-4 py-4 px-4">
          <div className="flex flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-white hover:text-white/80 transition-flow"
              onClick={closeSelf}
            />
          </div>

          <h2>
            <span className="text-2xl text-white font-semibold">
              Fill in your details to withdraw
            </span>
          </h2>

          <Formik
            validationSchema={schema}
            initialValues={{
              email: user?.email,
              wallet: "bitcoin",
              address: "",
              bankName: "",
              bankNumber: "",
              swift: "",
              channel: "bank",
            }}
            onSubmit={handleSubmit}
          >
            {({ isValid, values }) => {
              // console.log(errors);
              return (
                <Form className="grid grid-cols-2 gap-x-8 gap-y-4 w-full justify-center items-center  py-6 ">
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
                      Payout Mode
                    </label>
                    <Field
                      type="text"
                      as="select"
                      name="channel"
                      className=" field pr-4  w-full "
                    >
                      <option value="bank"> Bank </option>
                      <option value="crypto"> Crypto Wallet </option>
                    </Field>

                    <p className="text-red-400 text-sm pt-2">
                      <ErrorMessage name="channel" />
                    </p>
                  </div>

                  {values.channel === "bank" && (
                    <>
                      <div className="w-full">
                        <label className="text-base text-left text-white capitalize pb-2 block">
                          Bank Name
                        </label>
                        <Field
                          type="text"
                          name="bankName"
                          className=" field pr-4  w-full "
                        />

                        <p className="text-red-400 text-sm pt-2">
                          <ErrorMessage name="bankName" />
                        </p>
                      </div>

                      <div className="w-full">
                        <label className="text-base text-left text-white capitalize pb-2 block">
                          Bank Number
                        </label>
                        <Field
                          type="text"
                          name="bankNumber"
                          className=" field pr-4  w-full "
                        />

                        <p className="text-red-400 text-sm pt-2">
                          <ErrorMessage name="bankNumber" />
                        </p>
                      </div>

                      <div className="w-full">
                        <label className="text-base text-left text-white capitalize pb-2 block">
                          SWIFT
                        </label>
                        <Field
                          type="text"
                          name="swift"
                          className=" field pr-4 w-full "
                        />

                        <p className="text-red-400 text-sm pt-2">
                          <ErrorMessage name="swift" />
                        </p>
                      </div>
                    </>
                  )}

                  {values.channel === "crypto" && (
                    <>
                      <div className="w-full">
                        <label className="text-base text-left text-white capitalize pb-2 block">
                          Wallet
                        </label>
                        <Field
                          type="text"
                          as="select"
                          name="wallet"
                          className=" field pr-4  w-full "
                        >
                          <option value="bitcoin"> Bitcoin </option>
                          <option value="ethereum"> Ethereum </option>
                        </Field>

                        <p className="text-red-400 text-sm pt-2">
                          <ErrorMessage name="wallet" />
                        </p>
                      </div>

                      <div className="w-full">
                        <label className="text-base text-left text-white capitalize pb-2 block">
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className=" field pr-4  w-full "
                        />

                        <p className="text-red-400 text-sm pt-2">
                          <ErrorMessage name="address" />
                        </p>
                      </div>
                    </>
                  )}

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
        {/* </Zoom> */}
      </Slide>
    </Overlay>
  );
}
