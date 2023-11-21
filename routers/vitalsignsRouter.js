import { Router } from "express";
import { createVitalSigns, getVitalSigns, probabilisticEvent, promedio, getLastOne } from "../controllers/VitalSigns.js";
import authorization from "../middleware/auth.jwt.js";
const routerSigns = Router();


routerSigns.post("/create", createVitalSigns); 
routerSigns.get("/getAll",authorization,getVitalSigns); //protegiendo si hay token en la cookie
routerSigns.get("/event",authorization,probabilisticEvent)
routerSigns.get("/graph",authorization,promedio)
routerSigns.get("/lastOne",authorization,getLastOne)


export default routerSigns;