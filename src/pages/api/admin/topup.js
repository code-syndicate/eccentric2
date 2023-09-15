import { Withdrawal } from "../../../lib/models/transactions";
import { User } from "../../../lib/models/user";
import dbConnect from "../../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({
      email: body.email.trim(),
    }).exec();

    // console.log(" Existing user: ", existingUser);

    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "User with email address not found." }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    if (body.amount) {
      existingUser.account.balance += body.amount;
    }

    existingUser.notifications.push({
      message: `You have been credited with $${body.amount}`,
      date: Date.now(),
    });

    existingUser.history.push({
      remark: `You received a credit of $${body.amount}.`,
      txType: "credit",
      amount: body.amount,
      date: Date.now(),
    });

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
