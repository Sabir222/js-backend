import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import userRoute from "./Routes/userRoute";
import cookieParser from "cookie-parser";

const app: Application = express();
const PORT = 3000;

// const corsOptions = {
//   origin: "http://allowed-origin.com",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow credentials
//   optionsSuccessStatus: 204,
// };
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/users", userRoute);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
