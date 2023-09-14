import { FcEmptyTrash } from "react-icons/fc";
import { useState } from "react";
import { makeUrl, fetchUtil } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import cn from "classnames";

function NotificationPanel({ user }) {
  const [loading, setLoading] = useState(false);

  async function markAsRead(id) {
    if (loading) {
      return;
    }

    setLoading(true);
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.notifications),
      method: "PUT",
      body: JSON.stringify({ id, email: user.email }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Notification marked as read.",
        allowclose: true,
        onAccept: () => {
          window.location.href = "/settings?v=2";
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

    setLoading(false);
  }

  async function deleteNotification(id) {
    if (loading) {
      return;
    }

    setLoading(true);
    const res = await fetchUtil({
      url: makeUrl(config.apiEndpoints.notifications),
      method: "POST",
      body: JSON.stringify({ id, email: user.email }),
    });

    if (res.success) {
      setNotifyMessage({
        show: true,
        title: "Success",
        content: "Notification deleted.",
        allowclose: true,
        onAccept: () => {
          window.location.href = "/settings?v=2";
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

    setLoading(false);
  }

  return (
    <div>
      {user.notifications.length < 1 && (
        <div className="flex flex-col justify-center items-center py-10">
          <p className="text-center text-white/80 text-lg py-6">
            {" "}
            No notifications
            <br />
          </p>
          <FcEmptyTrash className="text-4xl" />
        </div>
      )}

      {user.notifications.length > 0 && (
        <div className="min-h-full overflow-y-auto max-h-[90vh]">
          {user.notifications
            .sort((b, a) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((c, i) => (
              <div
                key={i}
                className={
                  "flex flex-row justify-between items-center py-4 border-b border-white/10 " +
                  cn({
                    " opacity-60 ": c.isRead,
                  })
                }
              >
                <div className="flex flex-col justify-center items-start space-y-2">
                  <p className="text-white text-sm"> {c.message} </p>

                  <p className="text-white/80 text-xs">
                    {" "}
                    {new Date(c.date).toLocaleString()}{" "}
                  </p>

                  <div className="flex flex-row justify-start space-x-8 items-center w-full">
                    {!c.isRead && (
                      <button
                        onClick={() => markAsRead(c._id)}
                        disabled={loading}
                        className="text-green-500/80 disabled:opacity-20 text-sm hover:text-green-500 transition-flow"
                      >
                        {" "}
                        Mark as read{" "}
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(c._id)}
                      disabled={loading}
                      className="text-red-500/80 disabled:opacity-20 text-sm hover:text-red-500 transition-flow"
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;
