import { User } from "../lib/models/user";

export async function checkAuth(authObj) {
  const authUser = await User.findOne({ email: authObj.email }).exec();

  if (!authUser) {
    return false;
  }

  return true;
}
