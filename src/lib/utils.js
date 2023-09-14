import config from "../config";

export function makeUrl(pathname) {
  return `${config.apiUrl}${pathname}`;
}

export function isDigit(char) {
  return !isNaN(parseInt(char)) && parseInt(char) == char;
}

export async function fetchUtil({
  url,
  surfix = "",
  method,
  body,
  formEncoded = false,
  auth = null,
  headers = {},
}) {
  const options = {
    credentials: "omit",
    method,
    credentials: "same-origin",
  };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    if (formEncoded) {
      const form = new FormData();
      for (let key of Object.keys(body)) {
        form.append(key, body[key]);
      }

      options.body = form;
      // console.log(form)
    } else {
      options.body = JSON.stringify(body);
      options.headers = {
        "Content-Type": "application/json",
      };
    }
  }

  if (auth) {
    options.headers = {
      ...options.headers,
      Authorization: `${auth.tokenType} ${auth.accessToken}`,
    };
  }

  if (headers) {
    options.headers = {
      ...options.headers,
      ...headers,
    };

    try {
      const res = await fetch(url + surfix, options);

      if (res.ok) {
        return {
          success: true,
          data: await res.json(),
        };
      } else {
        const json = await res.json();
        return {
          success: false,
          errorMessage: json?.detail?.message || res.statusText,
          statusText: res.statusText,
          status: res.status,
          error: json,
        };
      }
    } catch (err) {
      console.log("fetchUtil: ", err.message);
      return {
        success: false,
        errorMessage: err.message,
        statusText: null,
        status: null,
      };
    }
  }
}

export function levelToColor(level) {
  switch (level) {
    case "info":
      return " text-sky-500 ";
    case "warning":
      return " text-yellow-600 ";
    case "error":
      return " text-red-500 ";
    case "success":
      return " text-green-500 ";
  }

  return " bg-black ";
}
