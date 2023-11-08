import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/authController.js";
import { checkDuplicateEmail } from "../middleware/verifySignup.js";
import authorization from "../middleware/auth.jwt.js";
const routerAuth = Router();


routerAuth.post("/signin", signIn); //login
routerAuth.post("/signup",[checkDuplicateEmail] ,signUp); //registro
routerAuth.get("/logout",authorization, logout)



export default routerAuth;