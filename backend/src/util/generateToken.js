import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (id) => {
    console.log(process.env.JWT_SECRET)
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d"
    }
  );
};
