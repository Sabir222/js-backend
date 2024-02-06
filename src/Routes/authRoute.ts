import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../strategies/local-strategy";
const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    return req.user
      ? res.status(200).send(req.user)
      : res.send("user not auth");
  }
);

router.get("/status", (req: Request, res: Response) => {
  return req.user ? res.send(req.user) : res.send("user not auth");
});

router.get("/logout", (req: Request, res: Response) => {
  if (!req.user) {
    return res.send("user not auth");
  } else {
    req.logout((err) => {
      if (err) return res.sendStatus(400);
      console.log("logged out !");
    });

    res.send("user logout");
  }
});

export default router;
