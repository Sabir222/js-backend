import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import userRoute from "./Routes/userRoute";

const app: Application = express();
app.use(express.json());
const PORT = 3000;

// const corsOptions = {
//   origin: "http://allowed-origin.com",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow credentials
//   optionsSuccessStatus: 204,
// };

app.use(cors());
app.use(helmet());

app.use("/api/v1/users", userRoute);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
