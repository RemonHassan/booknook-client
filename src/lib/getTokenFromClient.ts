import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  // Getting token for middleware for CLient
  const { data } = await authClient.token();
  const token = data?.token;
  return token;
};
