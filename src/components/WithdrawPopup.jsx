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
import {
  setWithdrawPopup,
  $withdrawPopup,
  setNotifyMessage,
} from "../lib/atoms";
import { startTransition } from "react";

const schema1 = Yup.object().shape({
  bankName: Yup.string()
    .required("Bank name is required")
    .min(3, "Must be 3 characters or more")
    .max(128, "Must be 128 characters or less"),

  swift: Yup.string()
    .required("SWIFT is required")
    .min(3, "Must be 3 characters or more"),

  channel: Yup.string()
    .required("Payout Mode is required")
    .oneOf(["bank", "crypto"], "Invalid payout mode"),

  bankNumber: Yup.number()
    .positive("Bank Number must be a positive number")
    .integer(" Bank Number must be an integer")
    .required("Bank Number is required")
    .typeError("Bank Number must be a number"),

  amount: Yup.number()
    .positive("Amount must be a positive number")
    .moreThan(100, "Amount must be greater than $100")
    .required("Amount is required")
    .typeError("Amount must be a number"),

  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

const schema2 = Yup.object().shape({
  address: Yup.string()
    .required("Address is required")
    .min(20, "Must be 20 characters or more"),

  channel: Yup.string()
    .required("Payout Mode is required")
    .oneOf(["bank", "crypto"], "Invalid payout mode"),

  wallet: Yup.string()
    .required("Wallet is required")
    .oneOf(["bitcoin", "ethereum"], "Invalid wallet"),

  amount: Yup.number()
    .positive("Amount must be a positive number")
    .moreThan(100, "Amount must be greater than $100")
    .required("Amount is required")
    .typeError("Amount must be a number"),

  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),
});

export default function WithdrawPopup({ user }) {
  const [loading, setLoading] = useState(false);
  const [isBank, setIsBank] = useState(true);
  const { show } = useStore($withdrawPopup);

  async function withdrawReq(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.withdraw),
      method: "POST",
      body: JSON.stringify(values),
    });

    setWithdrawPopup({
      show: false,
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Your withdrawal is being processed.",
        allowclose: true,
        onAccept: () => {
          window.location.reload();
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res.error?.message || res.errorMessage,
        allowclose: true,
      });
    }
  }

  async function handleSubmit(values) {
    if (values.amount > user.account.balance + user.account.bonus) {
      setNotifyMessage({
        show: true,
        title: "Insufficient funds",
        content: "You do not have enought balance to initiate this withdrawal.",
        allowclose: true,
      });

      return;
    }

    setLoading(true);

    await withdrawReq(values);

    setLoading(false);
  }

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
            <span className="text-lg lg:text-2xl text-white font-semibold">
              Fill in your details to withdraw
            </span>
          </h2>

          <Formik
            validationSchema={isBank ? schema1 : schema2}
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

              if (values.channel === "bank" && !isBank) {
                startTransition(() => {
                  setIsBank(true);
                });
              }

              if (values.channel === "crypto" && isBank) {
                startTransition(() => {
                  setIsBank(false);
                });
              }

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
                      Amount
                    </label>
                    <Field
                      type="text"
                      inputMode="numeric"
                      name="amount"
                      className=" field pr-4  w-full "
                    />

                    <p className="text-red-400 text-sm pt-2">
                      <ErrorMessage name="amount" />
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
