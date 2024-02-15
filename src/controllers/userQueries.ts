import { QueryResult } from "pg";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import pool from "../db";
import { hashPassword } from "../utils/hashPassword";

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

export const addUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const errors = validationResult(req); // check for express validator errors
  // hashing password
  const hashedPassword = hashPassword(password);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else if (!fullName || !email || !hashedPassword) {
      res.status(500).send("data missing try again please !");
    } else {
      const lowerCaseName = fullName.toLowerCase();
      const lowerCaseEmail = email.toLowerCase();
      const query = {
        text: "INSERT INTO users(full_name, email, hashed_password) VALUES($1, $2, $3)",
        values: [lowerCaseName, lowerCaseEmail, hashedPassword],
      };

      await pool.query(query);
      res.status(201).send(`User added successfully`);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Something wrong happened while trying to add a user!");
    return;
  }
};

export const searchUser = async (req: Request, res: Response) => {
  const { searchTerm } = req.body;

  try {
    if (!searchTerm) {
      res.status(400).json({ message: "Search term is required" });
      return;
    }

    const searchQuery = {
      text: "SELECT * FROM users WHERE full_name ILIKE $1",
      values: [`%${searchTerm}%`],
    };
    const result = await pool.query(searchQuery);
    const users = result.rows.map((row) => {
      const { hashed_password, created_at, ...userWithoutSensitiveData } = row;
      return userWithoutSensitiveData;
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};
