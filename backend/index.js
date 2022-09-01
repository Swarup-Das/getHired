import express from "express";
import { mongoDbConnection } from "./Connection.js";
import AuthRoutes from "./routes/Auth.js";
import PostRoutes from "./routes/Post.js";
import ApplyRoutes from "./routes/Job.js";
import UserRoutes from "./routes/User.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleWare/errorMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//connection to mongodb server
mongoDbConnection();

//just to test weather it is working properly
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello world" });
});

//all routings are done here
app.use("/auth", AuthRoutes);
app.use("/post", PostRoutes);
app.use("/user", UserRoutes);
app.use("/job", ApplyRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
