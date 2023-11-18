import { Router } from "express";
import { createVitalSigns, getVitalSigns, getLastWeek, probabilisticEvent } from "../controllers/VitalSigns.js";
import authorization from "../middleware/auth.jwt.js";
const routerSigns = Router();


routerSigns.post("/create", createVitalSigns); 
routerSigns.get("/getAll",authorization,getVitalSigns); //protegiendo si hay token en la cookie
routerSigns.get("/lastWeek",getLastWeek);
routerSigns.get("/prueba", probabilisticEvent)


export default routerSigns;