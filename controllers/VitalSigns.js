import { query } from "../connection.js";

export const createVitalSigns = async (req, res) => {
  try {
    const {
      heart_rate,
      temperature,
      systolic_pressure,
      diastolic_pressure,
      blood_oxygen,
      create_at
    } = req.body;

    const sql =
      "INSERT INTO vitalSigns (heart_rate,temperature,systolic_pressure, diastolic_pressure,blood_oxygen, create_at) VALUES (?,?,?,?,?,?)";
    const params = [
      heart_rate,
      temperature,
      systolic_pressure,
      diastolic_pressure,
      blood_oxygen,
      create_at
    ];
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

export const probabilisticEvent = async (req, res) => {
  try {
    const [result] = await query(
      `SELECT * FROM vitalSigns ORDER BY id DESC
    LIMIT 1`,
      []
    );

    console.log(result[0].temperature); //acedemos a temperatura
    const temperaturaMedida = result[0].temperature;
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
    console.log(probabilidadFiebre);

    res.status(201).json(probabilidadFiebre);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function calcularPromedio(datos) {
  // Verificar si hay datos en el arreglo
  if (datos.length === 0) {
    console.error("El arreglo está vacío no se ha hecho mediciones");
    return [];
  }

  let sumaHeartRate = 0;
  let sumaTemperature = 0;
  let sumaSystolicPressure = 0;
  let sumaDiastolicPressure = 0;
  let sumaBloodOxygen = 0;
  let fechaPromedio = 0;

  datos.forEach((dato) => {
    sumaHeartRate += dato.heart_rate;
    sumaTemperature += dato.temperature;
    sumaSystolicPressure += dato.systolic_pressure;
    sumaDiastolicPressure += dato.diastolic_pressure;
    sumaBloodOxygen += dato.blood_oxygen;
    fechaPromedio = dato.create_at;
  });

  // Calcular promedio dividiendo por (N) la cantidad de datos
  const cantidadDatos = datos.length;
  const promedioHeartRate = sumaHeartRate / cantidadDatos;
  const promedioTemperature = sumaTemperature / cantidadDatos;
  const promedioSystolicPressure = sumaSystolicPressure / cantidadDatos;
  const promedioDiastolicPressure = sumaDiastolicPressure / cantidadDatos;
  const promedioBloodOxygen = sumaBloodOxygen / cantidadDatos;


  const fecha = new Date(fechaPromedio);

  const diaSemana = fecha.getDay();
  const fechas = fecha.getDate()

  const fechasListo =  `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fechas}`;

  const diaSemanaFormateado = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];


  return {
    promedioHeartRate,
    promedioTemperature,
    promedioSystolicPressure,
    promedioDiastolicPressure,
    promedioBloodOxygen,
    fechaPromedio: diaSemanaFormateado[diaSemana],
    fecha: fechasListo
  };
}

export const promedio = async (req, res) => {
  try {
    const totalPromedios = [];

    const [result] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE()`,
      []
    );

    let promedio1 = await calcularPromedio(result);
    totalPromedios.push(promedio1);

    const [result2] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 1 DAY`,
      []
    );

    let promedio2 = await calcularPromedio(result2);
    totalPromedios.push(promedio2);

    const [result3] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 2 DAY`,
      []
    );

    let promedio3 = await calcularPromedio(result3);
    totalPromedios.push(promedio3);

    const [result4] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 3 DAY`,
      []
    );

    let promedio4 = await calcularPromedio(result4);
    totalPromedios.push(promedio4);

    const [result5] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 4 DAY`,
      []
    );

    let promedio5 = await calcularPromedio(result5);
    totalPromedios.push(promedio5);

    const [result6] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 5 DAY`,
      []
    );

    let promedio6 = await calcularPromedio(result6);
    totalPromedios.push(promedio6);

    const [result7] = await query(
      `SELECT * FROM vitalSigns WHERE create_at = CURDATE() - INTERVAL 6 DAY`,
      []
    );

    let promedio7 = await calcularPromedio(result7);
    totalPromedios.push(promedio7);

    res.json({ totalPromedios });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getLastOne = async (req, res) => {
  try {
    const [result] = await query(
      `SELECT * FROM vitalSigns ORDER BY id DESC
    LIMIT 1`,
      []
    );

    console.log(result[0]); //acedemos a temperatura
    res.status(201).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
