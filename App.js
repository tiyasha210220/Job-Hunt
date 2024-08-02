import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./Routes/UserRoutes.js";
import ApplicationRouter from "./Routes/ApplicationRoutes.js";
import JobRouter from "./Routes/JobRoutes.js";
import { DbConnection } from "./database/DbConnection.js";
import { errorMiddleware } from "./Middlewares/error.js";

dotenv.config({ path: "./Config/Config.env" });

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", ApplicationRouter);
app.use("/api/v1/job", JobRouter);

DbConnection();

app.use(errorMiddleware);

export default app;
