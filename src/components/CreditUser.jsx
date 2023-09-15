import React, { useEffect } from "react";
import { fetchUtil, makeUrl } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import { useState } from "react";
import Spinner from "./Spinner";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email(" Invalid email address ")
    .required("Email is required"),

  amount: Yup.number()
    .positive("Amount must be a positive number")
    // .moreThan(100, "Amount must be greater than $100")
    .required("Amount is required")
    .typeError("Amount must be a number"),
});

function CreditUser({ authUser }) {
  const [loading, setLoading] = useState(false);

  async function creditUser(values) {
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminTopup),
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Client balance updated successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=2";
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

    await creditUser(values);

    setLoading(false);
  }

  return (
    <div className="py-4">
      <div className=" border border-white/50 bg-bg1 rounded-md self-stretch shadow-md shadow-white/20">
        <p className="text-xl font-bold text-white text-left p-4">
          {" "}
          Fill in the client email address to credit.
          <br />
          <small className="text-sm font-normal">
            {" "}
            This will add to the total balance of the client{" "}
          </small>
        </p>

        <Formik
          initialValues={{
            email: "",
            amount: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, isValid }) => {
            return (
              <Form>
                <div className=" p-4 rounded-md ">
                  <div className="pb-8 space-y-6 flex flex-col justify-center items-center max-w-[400px]">
                    <div className="w-full ">
                      <label className="text-base text-left text-white capitalize pb-2 block">
                        Client email
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
                  </div>

                  <div className="w-[80%]   flex flex-col justify-center items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 lg:justify-between">
                    <button
                      disabled={!isValid || loading}
                      className="bg-text1/80 max-w-[400px] hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                      type="submit"
                      role="form"
                    >
                      {loading ? <Spinner size="tiny" /> : "Proceed"}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default CreditUser;
