import { Router, Request, Response } from "express";
import passport from "../../strategy/google-auth";
const router: Router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect(process.env.CLIENT_URL!);
  }
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error" });
    }
  });
  res.send("Logout success!");
});
export default router;
