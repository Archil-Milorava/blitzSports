import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/connectDB.js";

import googleAuthRoute from "./routes/auth/googleAuth.js";
import userRoutes from "./routes/user/user.routes.js";
import articleRoute from "./routes/articles/articles.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGIN_PRODUCTION
        : process.env.ALLOWED_ORIGIN_DEVELOPMENT,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json({ limit: "50mb" }));

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
