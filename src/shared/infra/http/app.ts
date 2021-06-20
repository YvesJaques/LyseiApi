import "reflect-metadata";
import "dotenv/config";
import upload from "@config/upload";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use(cors());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
