import React, { useEffect } from "react";
import { fetchUtil, makeUrl } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import { useState } from "react";
import Spinner from "./Spinner";
import EditUser from "./EditUser";

function AdminUsersList({ authUser }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [users, setUsers] = useState([]);
  const [editObj, setEditObj] = useState({
    show: false,
    user: null,
  });

  async function getUsers(page = 1) {
    setLoading(true);

    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.admin),
      method: "POST",
      body: JSON.stringify({
        page,
      }),
    });

    if (res.success) {
      setUsers(res.data);
    } else {
      setErr(res?.error?.message || res?.errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    getUsers();
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
                Refresh
              </button>
            </div>
          )}

          {editObj.show && (
            <EditUser
              user={editObj.user}
              closeMe={() => {
                setEditObj({
                  ...editObj,
                  show: false,
                });
              }}
            />
          )}

          {!loading && users && !editObj.show && users.length > 0 && (
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="flex flex-row justify-between items-center w-full">
                <p className="text-white text-lg"> Clients </p>
                <p className="text-white text-lg"> {users.length} </p>
              </div>

              <div className="flex flex-col justify-center items-center space-y-4 w-full">
                {/* Table starts  */}

                <div className="w-full  flex flex-col justify-center items-start rounded overflow-auto  max-h-[500px]">
                  <table className="w-full  bg-bg3  shadow-md rounded table">
                    <thead>
                      <tr>
                        <th className="py-6 px-4">S/N</th>

                        <th className="py-6 px-4">Name </th>
                        <th className="py-6 px-4">Email</th>
                        <th className="py-6 px-4">Balance</th>
                        <th className="py-6 px-4">Bonus</th>
                        <th className="py-6 px-4">Withdrawals</th>
                        <th className="py-6 px-4">Deposits</th>
                        <th className="py-6 px-4"> Joined </th>
                        <th className="py-6 px-4 text-green-500">Actions</th>

                        {/* Add more headers as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0 ? " bg-opacity-80 " : "  "
                          } border-b border-white/20`}
                        >
                          <td className="py-4 px-4 text-center table-cell">
                            {i + 1}
                          </td>
                          {console.log(user)}

                          <td className="py-4 px-4 text-center table-cell">
                            {user.firstName} {user.lastName}{" "}
                            {authUser.email === user.email && "  (You)"}
                          </td>
                          <td className="py-4 px-4 text-center table-cell">
                            {user.email}
                          </td>
                          <td className="py-4 px-4 text-center table-cell">
                            ${user.account?.balance}
                          </td>
                          <td className="py-4 px-4 text-center table-cell">
                            ${user.account?.bonus}
                          </td>
                          <td className="py-4 px-4 text-center table-cell">
                            ${user.account?.withdrawals}
                          </td>
                          <td className="py-4 px-4 text-center table-cell">
                            ${user.account?.deposits}
                          </td>

                          <td className="py-4 px-4 text-center table-cell">
                            {new Date(user.dateJoined).toLocaleString()}
                          </td>

                          <td className="py-4 px-4 text-center table-cell  flex-col justify-start space-y-2">
                            <span className="inline-bock  cursor-pointer px-1 text-green-500 hidden hover:text-green-400">
                              Credit
                            </span>
                            <span
                              onClick={() =>
                                setEditObj({
                                  show: true,
                                  user,
                                })
                              }
                              className="inline-bock cursor-pointer px-1 text-yellow-500 hover:text-yellow-400"
                            >
                              {" "}
                              Edit{" "}
                            </span>{" "}
                            <span className="inline-bock hidden cursor-pointer px-1 text-red-500 hover:text-red-400">
                              Delete
                            </span>
                          </td>
                          {/* Add more data rows as needed */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table ends  here */}
              </div>
            </div>
          )}

          <div className="py-16 space-y-6 flex flex-col justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersList;
