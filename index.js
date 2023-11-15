import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import routerSigns from "./routers/vitalsignsRouter.js";
import routerAuth from "./routers/authRoutes.js";

/* import "./connection.js" */
/* import routerAuth from "./routes/authRoutes.js";
import routerBirthdayBoy from "./routes/birthdayBoyRoutes.js";
import routerFile from "./routes/fileRouter.js";
import routerCard from "./routes/cardRoute.js"; */



const app= express();
config();
app.use(express.json());
//app.use(cors({ credentials: true }));
app.use(cors({ credentials: true, origin: 'http://44.195.148.205' }));
app.use(cookieParser());

const port=process.env.PORT_SERVER;

app.listen(port,()=>{
    console.log("listening on port "+port);
});

app.use("/api",routerSigns)
app.use("/api",routerAuth)

/* app.use("/api",routerAuth)
app.use("/api",routerBirthdayBoy)
app.use("/api",routerFile)
app.use("/api",routerCard) */