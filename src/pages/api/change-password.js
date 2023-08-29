import { User } from "../../lib/models/user";
import dbConnect from "../../lib/dbConnect";
import config from "../../config";
import { hashPassword } from "../../lib/hashing";

export const prerender = false;

export async function post({ request, cookies, redirect }) {
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

    try {
      const authUser = await User.authenticate(
        cookies.get(config.authCookieKey).value,
        body.password
      );

      authUser.password = hashPassword(body.password2);

      await authUser.save();

      cookies.delete(config.authCookieKey, { path: "/" });

      return new Response(JSON.stringify(authUser), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Current password is invalid!" }),
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
