import * as jwt from 'jsonwebtoken';

type JwtPayload = {
  userId: string;
} & jwt.JwtPayload;

export const generateToken = (
  userId: string,
  expiresIn: string | number,
): string => jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn });

export const decodeToken = (token?: string): string | null => {
  if (!token) {
    return null;
  }

  const { userId, exp } = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as JwtPayload;

  const isExpired = checkIfTokenIsExpired(exp);

  if (isExpired) {
    return null;
  }

  return userId;
};

export const checkIfTokenIsExpired = (exp?: number): boolean => {
  if (!exp) {
    return true;
  }

  return exp < Date.now() / 1000;
};
