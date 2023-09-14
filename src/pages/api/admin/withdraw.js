import { Withdrawal } from "../../../lib/models/transactions";
import dbConnect from "../../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const users = await Withdrawal.find({}).populate("user").lean().exec();

    return new Response(JSON.stringify(users), {
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

export async function patch({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await Withdrawal.findById(body.id).exec();

    // console.log(" Existing user: ", existingUser);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "Withdrawal not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    await Withdrawal.findByIdAndDelete(body.id).exec();

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

    const w = await Withdrawal.findById(body.id).exec();

    // console.log(" Existing user: ", existingUser);

    if (!w) {
      return new Response(JSON.stringify({ message: "Withdrawal not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    if (body.amount) {
      w.amount = body.amount;
    }

    if (body.date) {
      w.date = body.date;
    }

    await w.save();

    // console.log(newUser);

    return new Response(JSON.stringify(w), {
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
