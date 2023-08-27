import { User } from "../../../lib/models/user";

export async function post({ params, request }) {
  const body = await request.json();

  console.log(body);

  const newUser = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  await newUser.save();

  return new Response(JSON.stringify(newUser), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
