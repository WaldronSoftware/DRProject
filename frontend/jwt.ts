import jwt from "jsonwebtoken";

const accessTokenPrivateKey =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_PRIVATE_KEY || "";

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, accessTokenPrivateKey) as T;
  } catch (error) {
    return null;
  }
};
