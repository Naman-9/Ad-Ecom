import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
const PORT = 4000;
const app = express();
connectDB();
// middleware - to access data
app.use(express.json());
// Routes
app.use("/api/v1/user", userRoute);
// middleware
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});
