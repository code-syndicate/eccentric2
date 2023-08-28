const config = {
  appName: "Moon Crypto",
  description:
    "Moon Crypto is a cryptocurrency broker based in the United States. With a focus on simplicity, Moon Crypto allows you to buy and sell Bitcoin and other cryptocurrencies instantly and easily.",

  // apiUrl: `${import.meta.env.API_URL}/api` || "http://localhost:3000/api",
  apiUrl: "http://localhost:3000/api",

  authCookieKey: "AUTH_USER_ECCENTRIC",
  apiEndpoints: {
    createUser: "/users",
    logIn: "/sign-in",
  },
};

export default config;
