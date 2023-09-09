const config = {
  appName: "Sapa Crypto",
  description:
    "Moon Crypto is a cryptocurrency broker based in the United States. With a focus on simplicity, Moon Crypto allows you to buy and sell Bitcoin and other cryptocurrencies instantly and easily.",

  apiUrl: import.meta.env.PROD
    ? `https://eccentric-eight.vercel.app/api`
    : "http://localhost:3000/api",

  authCookieKey: "AUTH_USER_ECCENTRIC",
  apiEndpoints: {
    createUser: "/users",
    logIn: "/sign-in",
    changePassword: "/change-password",
    resetPassword: "/reset-password",
    getUserByEmail: "/users",
  },
};

export default config;
