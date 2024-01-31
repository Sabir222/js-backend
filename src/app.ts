import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import getUser from "./Routes/userRoute";
const app: Application = express();
const PORT = 3000;

// const corsOptions = {
//   origin: "http://allowed-origin.com",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow credentials
//   optionsSuccessStatus: 204,
// };
app.use(cors());
app.use(helmet());

const users = [
  {
    name: "sabir",
    age: 27,
  },
  {
    name: "yamal",
    age: 19,
  },
  {
    name: "messi",
    age: 22,
  },
];

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ name: "sabir", age: 27 });
});

app.get("/api/users", getUser);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
