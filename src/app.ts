import "express-async-errors";
import 'dotenv/config'
import express from "express";
import router from "./router";
import cors from 'cors'
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(errorMiddleware);
    app.use(express.json());
    app.use(router);

    return app.listen(8000);
  })
  .catch((error) => {
    console.log(error);
  });
