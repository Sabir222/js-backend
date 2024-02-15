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

      const checkResult = await pool.query(checkQuery);

      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: "Users are already friends" });
      }

      const insertQuery = {
        text: "INSERT INTO friends(user1_id, user2_id) VALUES($1, $2)",
        values: [user1_id, user2_id],
      };

      await pool.query(insertQuery);

      res.status(201).send(`Friend added successfully`);
    }
  } catch (err) {
    console.error(err);
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

export const acceptFriend = async (req: Request, res: Response) => {
  const { friendship_id } = req.body;
  console.log(friendship_id);

  try {
    if (!friendship_id) {
      res.json({ message: "friendship id necessary" });
      return;
    }
    const query = {
      text: "UPDATE friends SET status = $1 WHERE friendship_id = $2",
      values: ["accepted", friendship_id],
    };
    await pool.query(query);
    res.status(200).json({ message: "friendship accepted" });
  } catch (error) {
    console.error("Error accepting friend:", error);
    res.status(500).json({ message: "Error accepting friend" });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { friendship_id } = req.body;

  try {
    if (!friendship_id) {
      res.json({ message: "friendship id necessary" });
      return;
    }
    const query = {
      text: "DELETE FROM friends WHERE friendship_id = $1",
      values: [friendship_id],
    };
    await pool.query(query);
    res.status(200).json({ message: "friendship removed" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ message: "Error removing friend" });
  }
};

export const getRequests = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "id is required" });
  try {
    const query = {
      text: "SELECT * FROM friends WHERE user2_id = $1 AND status = $2",
      values: [id, "pending"],
    };

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
};
