import { getUserByEmail } from "../controllers/userController.js";
export const checkDuplicateEmail = async (req, res, next) => {

  const userFind = await getUserByEmail(req.body.email);
  if (userFind != undefined) {
    let email = JSON.stringify(userFind.email);
    if (email) {
      return res.status(400).json({ message: "[Error] email already in use" });
    }
  }
  next();
};