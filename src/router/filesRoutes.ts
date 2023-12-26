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
import { Files } from "../entities/Files";

export async function createFile(req: Request, res: Response) {
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
    const findPast = (await Folders.findOne({
      where: { user: { id } },
    })) as Folders;
    if (!findUser || (!findPast && path !== "Root")) {
      throw new UnauthorizedError("Invalid or missing user or folder");
    }
    const newFile = new Files();
    newFile.name = name;
    newFile.type = type;
    newFile.path = path;
    newFile.user = findUser;
    newFile.folder = findPast;
    newFile.save();
    res.status(201).send({ newFile });
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthorizedError
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
    res.send(error);
  }
}

export async function viewAllUserFiles(req: Request, res: Response) {
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
      throw new UnauthorizedError("Invalid or missing user or folder");
    }
    const findFiles = await Files.find({ where: { user: { id } } });
    res.status(202).send(findFiles);
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

export async function updateFiles(req: Request, res: Response) {
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
    const id = (verifyToken as any).id;
    const findUser = await User.findOne({ where: { id } });
    const findFile = await Files.findOne({ where: { id, user: { id } } });
    if (!findUser || !findFile) {
      throw new UnauthorizedError("Invalid or missing file or user");
    }
    findFile.name = newName;
    await findFile.save();
    res.status(200).send({ findFile });
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


export async function deleteFiles(req: Request, res: Response) {
  const { idFile } = req.body;
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
    const id = (verifyToken as any).id;
    const findUser = await User.findOne({ where: { id } });
    const findFile = await Files.findOne({ where: { id, user: { id } } });
    if (!findUser || !findFile) {
      throw new UnauthorizedError("Invalid or missing file or user");
    }
    await findFile.remove();
    res.status(200).send({ message: "File deleted successfully" });
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
