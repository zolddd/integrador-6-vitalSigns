import bcycript from "bcryptjs";
import { query } from "../connection.js";


export const getUsers = async (req, res) => {
  try {
    const [result] = await query("SELECT * FROM user", []);
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (email) => {
  try {
    const [result] = await query("SELECT * FROM user WHERE email= ?", [email]);
    if (result.length === 0) {
      return "[Error] something goes wrong"
    }
    console.log(result[0]);
    return result[0];
  } catch (error) {
    console.log("Error something goes wrong" + error);
  }
};

export const createUser = async (name,email,password) => {
  try {
    const salt = await bcycript.genSalt(10);
    const passwordEncript = await bcycript.hash(password, salt);
    const sql ="INSERT INTO user (name,email,password) VALUES (?,?,?)";
    const params = [name, email, passwordEncript];
    const [result] = await query(sql, params);
  } catch (error) {
    return error;
  }
};

export const updateUser = async (req, res) => {
  try {
    const [result] = await query("UPDATE user SET ? WHERE id=?", [
      req.body,
      req.params.id,
    ]);
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Error something goes wrong" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
