import express from "express";
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
const PORT = 4000;
const app = express();
connectDB();
app.use(express.json());



// Routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})