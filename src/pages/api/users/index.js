import { User } from "../../../lib/models/user";
import { hashPassword } from "../../../lib/hashing";
import dbConnect from "../../../lib/dbConnect";

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

    const existingUser = await User.findOne({ email: body.email })
      .lean()
      .exec();

    // console.log(" Existing user: ", existingUser);

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashPassword(body.password2),
    });

    // console.log(newUser);

    return new Response(JSON.stringify(newUser), {
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
