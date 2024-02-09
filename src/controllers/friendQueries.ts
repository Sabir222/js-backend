import { Request, Response, NextFunction } from "express";

import pool from "../db";

export const addFriend = async (req: Request, res: Response) => {
  const { user1_id, user2_id } = req.body;
  try {
    if (!user1_id || !user2_id) {
      return res.status(400).json({ message: "Missing required fields" });
    } else if (user1_id === user2_id) {
      return res
        .status(400)
        .json({ message: "Can't add yourself as a friend" });
    } else {
      const checkQuery = {
        text: "SELECT * FROM friends WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
        values: [user1_id, user2_id],
      };

      pool.query(checkQuery, (error, results) => {
        if (error) {
          return res.status(500).json({ message: "Something went wrong" });
        } else if (results.rows.length > 0) {
          return res.status(400).json({ message: "Users are already friends" });
        } else {
          const insertQuery = {
            text: "INSERT INTO friends(user1_id, user2_id) VALUES($1, $2)",
            values: [user1_id, user2_id],
          };

          pool.query(insertQuery, (error, results) => {
            if (error) {
              return res.status(500).json({ message: "Something went wrong" });
            } else {
              res.status(201).send(`Friend added successfully`);
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM friends WHERE user1_id = $1 OR user2_id = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Error fetching friends" });
  }
};
