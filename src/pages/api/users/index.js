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

export async function put({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    if (body.firstName) {
      existingUser.firstName = body.firstName;
    }

    if (body.lastName) {
      existingUser.lastName = body.lastName;
    }

    if (body.country) {
      existingUser.country = body.country;
    }

    if (body.city) {
      existingUser.city = body.city;
    }

    if (body.zipcode) {
      existingUser.zipcode = body.zipcode;
    }

    existingUser.notifications.push({
      message: "Your profile was updated",
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
