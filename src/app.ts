import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";

//routes
import userRoute from "./Routes/userRoute";
import authRoute from "./Routes/authRoute";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

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
app.use(
  session({
    secret: process.env.SESSIONSECRET || "",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
