import { User } from "../../../../lib/models/user";
import dbConnect from "../../../../lib/dbConnect";

export const prerender = false;

export async function get({ request, params }) {
  await dbConnect();

  //   console.log(params);

  const existingUser = await User.findOne({ email: params.email })
    .lean()
    .exec();

  // console.log(" Existing user: ", existingUser);

  if (!existingUser) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify(existingUser), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
