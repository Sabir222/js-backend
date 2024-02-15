import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {
  acceptFriend,
  addFriend,
  getFriends,
  getRequests,
  removeFriend,
} from "../controllers/friendQueries";

const router = Router();

router.post("/add", addFriend);
router.post("/get", getFriends);
router.post("/accept", acceptFriend);
router.post("/remove", removeFriend);
router.post("/requests", getRequests);

export default router;
