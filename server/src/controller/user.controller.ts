import { Request, Response } from "express";
import userModel from "../models/user.model";

class UserController {
  constructor() {}

  async getUser(req: Request, res: Response) {
    console.log("isAutetificated", req.isAuthenticated())
    console.log(req)
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const { profileId } = req.user as { profileId: string };

    const candidate = await userModel
      .findOne({ profileId })
      .populate({ path: "forms" })
      .exec();

    if (!candidate) {
      return res.status(404).send("User not found");
    }

    res.json(candidate);
  }
}

const userController = new UserController();
export default userController;
