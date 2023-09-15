import { User } from "../../lib/models/user";
import { Withdrawal } from "../../lib/models/transactions";

import dbConnect from "../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    // console.log(" Existing user: ", existingUser);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const newWithdrawal = await Withdrawal.create({
      amount: body.amount,
      user: existingUser._id,
      address: body.address,
      bankNumber: body.bankNumber,
      swift: body.swift,
      wallet: body.wallet,
      payoutMode: body.channel,
      bankName: body.bankName,
    });

    if (
      body.amount >
      existingUser.account.balance + existingUser.account.bonus
    ) {
      return new Response(JSON.stringify({ message: "Insufficient funds" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (existingUser.account.balance >= body.amount) {
      existingUser.account.balance -= body.amount;
    } else if (existingUser.account.bonus >= body.amount) {
      existingUser.account.bonus -= body.amount;
    } else {
      if (existingUser.account.balance > existingUser.account.bonus) {
        const remains = body.amount - existingUser.account.balance;

        existingUser.account.balance = 0;
        existingUser.account.bonus -= remains;
      } else {
        const remains = body.amount - existingUser.account.bonus;

        existingUser.account.bonus = 0;
        existingUser.account.balance -= remains;
      }
    }

    existingUser.account.withdrawals += body.amount;

    existingUser.history.push({
      remark: `You initiated a withdrawal of $${body.amount}.`,
      txType: "withdrawal",
      amount: body.amount,
      date: Date.now(),
    });

    existingUser.notifications.push({
      message: `You submitted a withdrawal request of $${body.amount} via ${body.channel}`,
      date: Date.now(),
    });

    await existingUser.save();

    return new Response(JSON.stringify(newWithdrawal), {
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

    // console.log("body: ", body);

    await dbConnect();

    const existingUser = await User.findOne({ email: body.email }).exec();

    // console.log(" Existing user: ", existingUser);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const thatN = existingUser.notifications.find(
      (notification) => "" + notification._id === body.id
    );

    // console.log("thatN: ", thatN);

    if (!thatN) {
      return new Response(
        JSON.stringify({ message: "Notification not found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    thatN.isRead = true;

    const otherN = existingUser.notifications.filter((notification) => {
      //   console.log("notification.id: ", notification._id, "body.id: ", body.id);
      return "" + notification._id !== body.id;
    });

    // console.log("thatN: ", thatN, "otherN: ", otherN);

    existingUser.notifications = [...otherN, thatN];

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
