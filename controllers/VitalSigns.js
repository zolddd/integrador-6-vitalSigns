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

export const getLastWeek =async (req, res)=>{
  try {
    const [result] = await query(`SELECT *
    FROM vitalSigns
    WHERE DATE(create_at) >= CURDATE() - INTERVAL (DAYOFWEEK(CURDATE()) - 2) DAY
      AND DATE(create_at) <= CURDATE() - INTERVAL (DAYOFWEEK(CURDATE()) - 8) DAY
      AND DAYOFWEEK(create_at) BETWEEN 2 AND 7`, []);    
    res.status(201).json(result);
  } catch (error) {error
    return res.status(500).json({ message: error.message });
  }
}

export const probabilisticEvent = async (req, res)=>{

  try {
    const [result] = await query(`SELECT * FROM vitalSigns ORDER BY id DESC
    LIMIT 1`, []);
    console.log("imprimiendo: "+result);
    console.log(result[0].temperature); //acedemos a temperatura
    const temperaturaMedida = result[0].temperature
    const umbralFiebre = 38; //esta temperatura es considerada fiebre

    // Inicializar el número de casos favorables y totales
    const casosFavorables = 0;
     const casosTotales = 1;

    // Verificar si la temperatura indica fiebre
    if (temperaturaMedida >= umbralFiebre) {
      casosFavorables = 1;
     }

    // Calcular la probabilidad
    const probabilidadFiebre = casosFavorables / casosTotales;
    console.log(probabilidadFiebre)

    res.status(201).json(probabilidadFiebre);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}