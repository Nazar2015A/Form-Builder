import { Application } from "express";
import authRouter from "./api/google-auth.router";
import userRouter from "./api/user.router";
import formRouter from "./api/form.router";
class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("", authRouter);
    this.app.use("", userRouter);
    this.app.use("", formRouter);
  }
}

export default AppRouter;
