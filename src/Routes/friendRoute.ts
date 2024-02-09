import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { addFriend, getFriends } from "../controllers/friendQueries";

const router = Router();

router.post("/add", addFriend);
router.get("/get", getFriends);

export default router;
