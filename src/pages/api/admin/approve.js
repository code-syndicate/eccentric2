import { Withdrawal } from "../../../lib/models/transactions";
import { User } from "../../../lib/models/user";
import dbConnect from "../../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
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

    w.status = "completed";

    const usr = await User.findById(w.user).exec();

    if (usr) {
      usr.notifications.push({
        message: `Your withdrawal of $${w.amount} has been approved, payout will be processed shortly.`,
        date: Date.now(),
      });
    }

    await usr.save();
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
