import { fetchUtil, makeUrl } from "./utils";
import config from "../config";

export async function checkAuth(authObj) {
  // console.log("Auth checking started!");
  const res = await fetchUtil({
    url: makeUrl(config.apiEndpoints.getUserByEmail),
    method: "GET",
    surfix: `/${authObj.email}`,
  });

  // console.log(res);

  if (!res.success) {
    return false;
  }

  if (res.data && res.data.email) {
    return {
      user: res.data,
    };
  }

  return false;
}

export async function checkAdminAuth(authObj) {
  // console.log("Auth checking started!");
  const res = await fetchUtil({
    url: makeUrl(config.apiEndpoints.getUserByEmail),
    method: "GET",
    surfix: `/${authObj.email}`,
  });

  // console.log(res);

  if (!res.success) {
    return false;
  }

  if (res.data && res.data.email) {
    if (!res.data?.isAdmin) {
      return false;
    }

    return {
      user: res.data,
    };
  }

  return false;
}
