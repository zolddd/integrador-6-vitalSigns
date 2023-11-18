import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import routerSigns from "./routers/vitalsignsRouter.js";
import routerAuth from "./routers/authRoutes.js";


const app= express();
config();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://44.195.148.205' }));
app.use(cookieParser());

const port=process.env.PORT_SERVER;

app.listen(port,()=>{
    console.log("listening on port "+port);
});

app.use("/api",routerSigns)
app.use("/api",routerAuth)