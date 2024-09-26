const config = {
  appName: "EmuskFX",
  description:
    "EmuskFX Crypto is a cryptocurrency broker based in the United States. With a focus on simplicity, Moon Crypto allows you to buy and sell Bitcoin and other cryptocurrencies instantly and easily.",

  apiUrl: import.meta.env.PUBLIC_API_URL || "http://localhost:3001/api",

  authCookieKey: "AUTH_USER_ECCENTRIC",
  apiEndpoints: {
    createUser: "/users",
    logIn: "/sign-in",
    changePassword: "/change-password",
    resetPassword: "/reset-password",
    getUserByEmail: "/users",
    notifications: "/notifications",
    withdraw: "/withdraw",
    admin: "/admin",
    adminWithdraw: "/admin/withdraw",
    adminTopup: "/admin/topup",
    adminApprove: "/admin/approve",
    adminDecline: "/admin/decline",
  },
};

export default config;
