import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "./strategy/google-auth";
import AppRouter from "./routes";

dotenv.config();

const app: Express = express();
const router = new AppRouter(app);
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
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

start();
