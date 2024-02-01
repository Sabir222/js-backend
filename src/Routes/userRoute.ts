import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { filterUsers } from "../Controllers/userControllers";
import { addUser, getUsers } from "../queries/userQueries";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
// router.get("/", (req: Request, res: Response, next: NextFunction) => {
//   const { age, name } = req.query;
//   if (!age || !name) {
//     res.status(400).send("Bad Request");
//   }

//   const parsedAge = parseInt(age as string);
//   const user = filterUsers(name as string, parsedAge);

//   res.send(user);
// });

export default router;
