import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from "../helpers/apiError";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import { Folders } from "../entities/Folder";
import { User } from "../entities/User";

export async function createFolder(req: Request, res: Response) {
  const { name, type, path } = req.body;
  const bearerToken = req.headers["authorization"];

  try {
    if (!name || !type || !path) {
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
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      throw new UnauthorizedError("Invalid or missing user");
    }
    const newFolder = new Folders();
    newFolder.name = name;
    newFolder.type = type;
    newFolder.path = path;
    newFolder.user = findUser;
    await newFolder.save();
    res.status(201).send({ newFolder });
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError
    ) {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
}

export async function viewAllUserFolder(req: Request, res: Response) {
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
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      throw new UnauthorizedError("Invalid or missing user");
    }
    const foldersUser = await Folders.find({ where: { user: { id } } });
    res.status(202).send(foldersUser);
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError
    ) {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
}


export async function updateFolder(req: Request, res: Response) {
  const { idFile, newName } = req.body;
  const bearerToken = req.headers["authorization"];
  try {
    if (!idFile || !newName) {
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
    const id = (verifyToken as any).id;''
    const findUser = await User.findOne({ where: { id } });
    const findFolder = await Folders.findOne({ where: { id, user: { id } } });
    if (!findUser || !findFolder) {
      throw new UnauthorizedError("Invalid or missing file or user");
    }
    findFolder.name = newName;
    await findFolder.save();
    res.status(200).send({ findFolder });
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export async function deleteFolder(req: Request, res: Response) {
  const { idFile} = req.body;
  const bearerToken = req.headers["authorization"];
  try {
    if (!idFile) {
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
    const id = (verifyToken as any).id;''
    const findUser = await User.findOne({ where: { id } });
    const findFolder = await Folders.findOne({ where: { id, user: { id } } });
    if (!findUser || !findFolder) {
      throw new UnauthorizedError("Invalid or missing file or user");
    }
    await findFolder.remove()
    res.status(200).send({ message: "Folder deleted successfully" });
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError ||
      error instanceof NotFoundError
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}



