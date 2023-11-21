import { Router } from "express";
import { createVitalSigns, getVitalSigns, probabilisticEvent, promedio, getLastOne } from "../controllers/VitalSigns.js";
import authorization from "../middleware/auth.jwt.js";
const routerSigns = Router();


routerSigns.post("/create", createVitalSigns); 
routerSigns.get("/getAll/:id",authorization,getVitalSigns); //protegiendo si hay token en la cookie
routerSigns.get("/event/:id",authorization,probabilisticEvent)
routerSigns.get("/graph/:id",authorization,promedio)
routerSigns.get("/lastOne/:id",authorization,getLastOne)


export default routerSigns;