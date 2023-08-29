import { User } from "../../lib/models/user";
import dbConnect from "../../lib/dbConnect";
import { Prepassword } from "../../lib/models/prepassword";
import { hashPassword } from "../../lib/hashing";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    if (body.password1 !== body.password2) {
      return new Response(
        JSON.stringify({ message: "Passwords do not match!" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    await dbConnect();

    const user = await User.findOne({ email: body.email }).exec();

    if (user) {
      // Do the password reset shit here

      await Prepassword.deleteMany({ used: false }).exec();

      await Prepassword.create({
        email: body.email,
        tempPassword: hashPassword(body.password2),
      });

      // send the email here

      return new Response(JSON.stringify(null), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({
          message: "We could not find any account with that record.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  }

  return new Response(
    JSON.stringify({
      message: "Invalid Content-Type",
    }),
    { status: 400, statusText: "Bad Request" }
  );
}
