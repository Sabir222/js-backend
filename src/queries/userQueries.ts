import { Request, Response, NextFunction } from "express";

import pool from "../db";

export const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const addUser = (req: Request, res: Response) => {
  const userData = req.body;

  const query = {
    text: "INSERT INTO users(user_id, username, email) VALUES($1, $2, $3)",
    values: [userData.user_id, userData.username, userData.email],
  };

  pool.query(query, (error, results) => {
    if (error)
      res
        .status(500)
        .send("Something wrong happened while trying to add a user!");
    res.status(201).send(`User added with ID: ${userData.user_id}`);
  });
};
