import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/apiError";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { User } from "../entities/User";

export async function viewUser(req: Request, res: Response) {
  const bearerToken = req.headers["authorization"];
  try {
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const token = bearerToken.split(" ")[1];
    const key = process.env.JWT_HASH as Secret;
    const verifyToken = jwt.verify(token, key);
    if (!verifyToken) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const id = (verifyToken as any).id;
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    res.status(200).send({ existingUser });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function nameCreate(req: Request, res: Response) {
  const { name, surname } = req.body;
  try {
    if (!name) {
      throw new BadRequestError("Credencial Requerida");
    }
    const newUser = new User();
    newUser.name = `${name + surname}`;
    newUser.save();
    res.status(201).send({ user: newUser });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
}

export async function formCreate(req: Request, res: Response) {
  const { name, email, password, confirmedPassword } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!email || !password || !confirmedPassword) {
      throw new BadRequestError("Credencial Requerida");
    }
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Existe usuário com este e-mail");
    }
    if (password !== confirmedPassword) {
      throw new BadRequestError("Senhas não conhecidem");
    }
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      throw new BadRequestError("Existe usuário com este e-mail");
    }
    const encriptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.email = email;
    newUser.password = encriptedPassword;
    await newUser.save();
    res.status(201).send({ user: newUser });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
}

export async function checkingEmail(req: Request, res: Response) {
  const { email } = req.body;
  try {
    if (!email) {
      throw new BadRequestError("Credencial Requerida");
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const jwtHash = process.env.JWT_HASH as string | Buffer;
      const token = jwt.sign({ id: existingUser.id }, jwtHash, {
        expiresIn: "5h",
      });
      res.status(200).send({ token: token });
    } else {
      throw new BadRequestError("Não existe usuário com este e-mail");
    }
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function checkingPassword(req: Request, res: Response) {
  const { password } = req.body;
  const bearerToken = req.headers["authorization"];
  try {
    if (!password) {
      throw new BadRequestError("Credencial Requerida");
    }
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new UnauthorizedError("Token Invalido ou Inexistente");
    }
    const token = bearerToken.split(" ")[1];
    const key = process.env.JWT_HASH as Secret;
    const verifyToken = jwt.verify(token, key);
    if (!verifyToken) {
      throw new UnauthorizedError("Token inválido ou inexistente");
    }
    const id = (verifyToken as any).id;
    const existingUser = await User.findOne({ where: { id } });
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
        throw new BadRequestError("Credencial Inválida");
      }
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
    res.status(202);
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { newName, newPassword } = req.body;
  const bearerToken = req.headers["authorization"];
  try {
    if (!newName || !newPassword) {
      throw new BadRequestError("Required Credentials");
    }
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const token = bearerToken.split(" ")[1];
    const key = process.env.JWT_HASH as Secret;
    const verifyToken = jwt.verify(token, key);
    if (!verifyToken) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const id = (verifyToken as any).id;
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    existingUser.name = newName;
    existingUser.password = newPassword;
    await existingUser.save();
    res.status(200).send({ existingUser });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const bearerToken = req.headers["authorization"];
  try {
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const token = bearerToken.split(" ")[1];
    const key = process.env.JWT_HASH as Secret;
    const verifyToken = jwt.verify(token, key);
    if (!verifyToken) {
      throw new UnauthorizedError("Invalid or missing token");
    }
    const id = (verifyToken as any).id;
    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    await existingUser.remove();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
