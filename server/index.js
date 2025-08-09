import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";

import googleAuthRoute from "./routes/auth/googleAuth.js";
import userRoutes from "./routes/user/user.routes.js";
import articleRoute from "./routes/articles/articles.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGIN_PRODUCTION
        : process.env.ALLOWED_ORIGIN_DEVELOPMENT,
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.json());

app.use("/api/v1/auth", googleAuthRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/article", articleRoute);

app.use((req, res) => {
  res.status(400).json({
    message: `Bad Request: Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on ${PORT}`);
});
