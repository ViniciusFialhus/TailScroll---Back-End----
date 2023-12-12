import { BadRequestError, NotFoundError } from "../helpers/apiError";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities/User";

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!name || !email || !password) {
      throw new BadRequestError("Required Credentials");
    }
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(existingUser);
      throw new BadRequestError("User with this email exists");
    }
    const encriptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = encriptedPassword;
    await newUser.save();
    res.status(201).send({ user: newUser });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError("Required Credentials");
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      const comparePassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (comparePassword) {
        const jwtHash = process.env.JWT_HASH as string | Buffer;
        const token = jwt.sign({ id: existingUser.id }, jwtHash, {
          expiresIn: "5h",
        });
        res.status(200).send({ token: token });
      } else {
        throw new BadRequestError("Credentials Invalid");
      }
    } else {
      throw new NotFoundError("User not found");
    }
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
