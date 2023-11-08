import { Router } from "express";
import { createVitalSigns, getVitalSigns } from "../controllers/VitalSigns.js";
import authorization from "../middleware/auth.jwt.js";
const routerSigns = Router();


routerSigns.post("/create", createVitalSigns); 
routerSigns.get("/getAll",authorization,getVitalSigns); //protegiendo si hay token en la cookie


export default routerSigns;