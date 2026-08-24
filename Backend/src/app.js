import express from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser"
import authRouter from "./router/auth.router.js"
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))



app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/auth/api/", authRouter)

export default app;
