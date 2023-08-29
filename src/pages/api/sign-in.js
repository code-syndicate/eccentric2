import { User } from "../../lib/models/user";
import dbConnect from "../../lib/dbConnect";
import config from "../../config";

export const prerender = false;

export async function post({ request, cookies, redirect }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    try {
      const authUser = await User.authenticate(body.email, body.password);

      //   console.log("AUTH USER: ", authUser);

      cookies.set(config.authCookieKey, authUser.email, { path: "/" });

      //   console.log(cookies.get(config.authCookieKey));

      return new Response(JSON.stringify(authUser), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: err.message }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
  }

  return new Response(
    JSON.stringify({
      message: "Invalid Content-Type",
    }),
    { status: 400, statusText: "Bad Request" }
  );
}
