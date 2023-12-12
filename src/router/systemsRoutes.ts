import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from "../helpers/apiError";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Rpg_systems} from "../entities/Rpg_systems ";
import "dotenv/config";

export async function viewAllSystems(req: Request, res: Response) {
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
   const findSystem = await  Rpg_systems.find()
   res.status(200).send(findSystem)
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
