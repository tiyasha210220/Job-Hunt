import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import UserRouter from "./Routes/UserRoutes.js";
import ApplicationRouter from "./Routes/ApplicationRoutes.js";
import JobRouter from "./Routes/JobRoutes.js";
import { DbConnection } from "./Database/DbConnection.js";
import { errorMiddleware } from "./Middlewares/error.js";

dotenv.config({ path: "./Config/Config.env" });

const App = express();

App.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

App.use(cookieParser());

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

App.use("/api/v1/user", UserRouter);
App.use("/api/v1/application", ApplicationRouter);
App.use("/api/v1/job", JobRouter);

DbConnection();

App.use(errorMiddleware);

export default App;
