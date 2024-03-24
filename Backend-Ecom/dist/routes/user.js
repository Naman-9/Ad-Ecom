import express from "express";
import { getAllUsers, newUser } from "../controllers/user.js";
const app = express.Router();
// route - /ai/v1/user/new
app.post("/newuser", newUser);
// route - /ai/v1/user/all
app.post("/all", getAllUsers);
export default app;
