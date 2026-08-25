import express from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser"
import authRouter from "./router/auth.router.js"
import cors from "cors";

const app = express();





app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRouter)

export default app;
