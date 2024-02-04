import { QueryResult } from "pg";
import { Request, Response, NextFunction } from "express";

import pool from "../db";

export type userData = {
  email: string;
  hashed_password: string;
  full_name: string;
  user_id: number;
  role: string;
};

export const getUserByEmail = async (
  email: string
): Promise<QueryResult<userData>> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE  email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (
  id: number
): Promise<QueryResult<userData>> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE  user_id = $1", [
      id,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const addUser = (req: Request, res: Response) => {
  const { fullName, email, hashedPassword } = req.body;

  if (!fullName || !email || !hashedPassword) {
    res.status(500).send("data missing try again please !");
  } else {
    const query = {
      text: "INSERT INTO users(full_name, email, hashed_password) VALUES($1, $2, $3)",
      values: [fullName, email, hashedPassword],
    };

    pool.query(query, (error, results) => {
      if (error) {
        return res
          .status(500)
          .send("Something wrong happened while trying to add a user!");
      } else {
        res.status(201).send(`User added successfully`);
      }
    });
  }
};
