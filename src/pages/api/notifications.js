import { User } from "../../lib/models/user";
import dbConnect from "../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    // console.log(" Existing user: ", existingUser);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    existingUser.notifications = existingUser.notifications.filter(
      (notification) => "" + notification._id !== body.id
    );

    await existingUser.save();

    // console.log(newUser);

    return new Response(JSON.stringify(existingUser), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Invalid Content-Type",
    }),
    { status: 400, statusText: "Bad Request" }
  );
}

export async function put({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const thatN = existingUser.notifications.find(
      (notification) => "" + notification._id === body.id
    );

    // console.log("thatN: ", thatN);

    if (!thatN) {
      return new Response(
        JSON.stringify({ message: "Notification not found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    thatN.isRead = true;

    const otherN = existingUser.notifications.filter((notification) => {
      //   console.log("notification.id: ", notification._id, "body.id: ", body.id);
      return "" + notification._id !== body.id;
    });

    // console.log("thatN: ", thatN, "otherN: ", otherN);

    existingUser.notifications = [...otherN, thatN];

    await existingUser.save();

    // console.log(newUser);

    return new Response(JSON.stringify(existingUser), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Invalid Content-Type",
    }),
    { status: 400, statusText: "Bad Request" }
  );
}
