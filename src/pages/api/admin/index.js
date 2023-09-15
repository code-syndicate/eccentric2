import { User } from "../../../lib/models/user";
import dbConnect from "../../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const users = await User.find({}).lean().exec();

    // console.log(" Existing user: ", existingUser);

    // console.log(newUser);

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

export async function put({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    // console.log(" Existing user: ", existingUser);

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

    if (body.allowLogin) {
      existingUser.isActive = body.allowLogin;
    }

    if (body.balance) {
      existingUser.account.balance = body.balance;
    }

    if (body.bonus) {
      existingUser.account.bonus = body.bonus;
    }

    if (body.withdrawals) {
      existingUser.account.withdrawals = body.withdrawals;
    }

    if (body.deposits) {
      existingUser.account.deposits = body.deposits;
    }

    if (body.dogecoin) {
      existingUser.account.dogecoin = body.dogecoin;
    }

    if (body.bitcoin) {
      existingUser.account.bitcoin = body.bitcoin;
    }

    if (body.ethereum) {
      existingUser.account.ethereum = body.ethereum;
    }

    if (body.smartchain) {
      existingUser.account.smartchain = body.smartchain;
    }

    if (body.dateJoined) {
      existingUser.dateJoined = body.dateJoined;
    }

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
