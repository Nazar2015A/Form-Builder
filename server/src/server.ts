import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./strategy/google-auth";
import AppRouter from "./routes";

dotenv.config();

const app: Express = express();
const router = new AppRouter(app);
const PORT = process.env.PORT! || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

router.init();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

const healthCare = () => {
  setInterval(() => {
    fetch(process.env.SERVER_URL!);
  }, 300000);
};
healthCare();
start();
