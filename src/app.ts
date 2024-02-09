import pgSession from "connect-pg-simple";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import pool from "./db";
//routes
import userRoute from "./Routes/userRoute";
import authRoute from "./Routes/authRoute";
import friendRoute from "./Routes/friendRoute";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  // origin: "http://allowed-origin.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials
  optionsSuccessStatus: 204,
};

// storing session in the database and remove it when too when logout()
const pgSessionStore = new (pgSession(session))({
  pool: pool,
  tableName: "session",
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(
  session({
    store: pgSessionStore,
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
app.use("/api/v1/auth/login", authRoute);
app.use("/api/v1/friend", friendRoute);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
