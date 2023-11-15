import { query } from "../connection.js";

export const createVitalSigns = async (req, res) => {
    try {
      const { heart_rate,temperature,systolic_pressure, diastolic_pressure,blood_oxygen} = req.body;
      const sql =
      "INSERT INTO vitalSigns (heart_rate,temperature,systolic_pressure, diastolic_pressure,blood_oxygen) VALUES (?,?,?,?,?)";
      const params = [heart_rate,temperature,systolic_pressure, diastolic_pressure,blood_oxygen];
      const [result] = await query(sql, params);
      res.json({ message: "Save succesfuly!" });
    } catch (error) {
      return error;
    }
};

export const getVitalSigns = async (req, res) => {
    try {
      const [result] = await query("SELECT * FROM vitalSigns", []);
      console.log(result);
      res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };