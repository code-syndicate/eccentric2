import React, { useEffect } from "react";
import { fetchUtil, makeUrl } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import { useState } from "react";
import Spinner from "./Spinner";
import EditWithdraw from "./EditWithdraw";

function WithdrawalsList({ authUser }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [editObj, setEditObj] = useState({
    show: false,
    data: null,
  });

  async function approveWithdrawal(id) {
    if (!confirm("Approve withdrawal request?")) {
      return;
    }

    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminApprove),
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Approval successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=1";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res?.error?.message || res?.errorMessage,
        allowclose: true,
      });
    }

    setLoading(false);
  }

  async function deleteWithdrawal(id) {
    if (!confirm("Delete withdrawal request?")) {
      return;
    }

    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminWithdraw),
      method: "PATCH",
      body: JSON.stringify({
        id,
      }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Deletion successful.",
        allowclose: false,
        onAccept: () => {
          window.location.href = "/admin?v=1";
          // redirect('/sign-in')
        },
        onAcceptText: "Refresh",
      });
    } else {
      setNotifyMessage({
        show: true,
        title: "Something went wrong",
        content: res?.error?.message || res?.errorMessage,
        allowclose: true,
      });
    }

    setLoading(false);
  }

  async function getWithdrawals(page = 1) {
    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.adminWithdraw),
      method: "POST",
      body: JSON.stringify({
        page,
      }),
    });

    if (res.success) {
      setWithdrawals(res.data);
    } else {
      setErr(res?.error?.message || res?.errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    getWithdrawals();
  }, []);

  return (
    <div className="py-4">
      <div className=" border border-white/50 bg-bg1 rounded-md self-stretch shadow-md shadow-white/20">
        <div className="p-6 rounded-md space-y-6">
          {loading && (
            <div className="py-16">
              <Spinner size="small" />
            </div>
          )}
          {err && (
            <div className="py-16 space-y-6 flex flex-col justify-center items-center">
              <p className="text-center text-red-500">{err}</p>

              <button
                onClick={() => {
                  location.reload();
                }}
                disabled={loading}
                className="bg-text1/80 max-w-[200px] hover:bg-text1/90 transition-flow text-bg1 px-8 disabled:opacity-40 disabled:pointer-events-none w-full py-2 text-center rounded outline-none "
                type="button"
              >
                Retry
              </button>
            </div>
          )}

          {editObj.show && (
            <EditWithdraw
              data={editObj.data}
              closeMe={() => {
                setEditObj({
                  ...editObj,
                  show: false,
                });
              }}
            />
          )}

          {!loading &&
            withdrawals &&
            !editObj.show &&
            withdrawals.length > 0 && (
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="text-white text-lg"> Withdrawals </p>
                  <p className="text-white text-lg"> {withdrawals.length} </p>
                </div>

                <div className="flex flex-col justify-center items-center space-y-4 w-full">
                  {/* Table starts  */}

                  <div className="w-full  flex flex-col justify-center items-start rounded overflow-auto py-32 max-h-[500px]">
                    <table className="w-full  bg-bg3 pt-20 shadow-md rounded table">
                      <thead>
                        <tr>
                          <th className="py-6 px-4">S/N</th>
                          <th className="py-6 px-4"> Client </th>
                          <th className="py-6 px-4"> Amount </th>
                          <th className="py-6 px-4">Payout Mode </th>
                          <th className="py-6 px-4"> Status </th>

                          <th className="py-6 px-4"> Date </th>
                          <th className="py-6 px-4">Wallet</th>
                          <th className="py-6 px-4"> Address</th>
                          <th className="py-6 px-4">Bank Number </th>
                          <th className="py-6 px-4">Bank Name</th>
                          <th className="py-6 px-4">SWIFT</th>

                          <th className="py-6 px-4 text-green-500">Actions</th>

                          {/* Add more headers as needed */}
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawals.map((w, i) => (
                          <tr
                            key={i}
                            className={`${
                              i % 2 === 0 ? " bg-opacity-80 " : "  "
                            } border-b border-white/20`}
                          >
                            <td className="py-4 px-4 text-center table-cell">
                              {i + 1}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.user.email}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              ${w.amount}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.payoutMode}
                            </td>

                            <td className="py-4 px-4 font-bold capitalize text-center table-cell">
                              {w.status}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {new Date(w.date).toLocaleString()}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.wallet || "Nil"}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.address || "Nil"}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.bankNumber || "Nil"}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.bankName || "Nil"}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.swift || "Nil"}
                            </td>

                            <td className="py-4 px-4 text-center table-cell">
                              {w.status === "pending" && (
                                <span
                                  onClick={async () => {
                                    await approveWithdrawal(w._id);
                                  }}
                                  className="inline-bock  cursor-pointer px-1 text-green-500 hover:text-green-400"
                                >
                                  Approve
                                </span>
                              )}
                              <span
                                onClick={() => {
                                  setEditObj({
                                    show: true,
                                    data: w,
                                  });
                                }}
                                className="inline-bock cursor-pointer px-1 text-yellow-500 hover:text-yellow-400"
                              >
                                Edit
                              </span>{" "}
                              <span
                                onClick={async () => {
                                  await deleteWithdrawal(w._id);
                                }}
                                className="inline-bock  cursor-pointer px-1 text-red-500 hover:text-red-400"
                              >
                                Delete
                              </span>
                            </td>

                            {/* Add more data rows as needed */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table ends  */}
                </div>
              </div>
            )}

          <div className="py-16 space-y-6 flex flex-col justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalsList;
