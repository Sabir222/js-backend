import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../strategies/local-strategy";
const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

router.get("/status", (req: Request, res: Response) => {
  console.log(req.session);
  return req.user ? res.send(req.user) : res.send("user not auth");
});

export default router;
