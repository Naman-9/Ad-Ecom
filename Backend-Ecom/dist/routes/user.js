import express from "express";
import { newUser } from "../controllers/user.js";
const app = express.Router();
// route - /ai/v1/user/new
app.post("/newuser", newUser);
export default app;
