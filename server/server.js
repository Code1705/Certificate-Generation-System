import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/certificateRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/certificates", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();
