import express from "express";
import { getMyArticles } from "./user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/myArticles/:id", getMyArticles);

export default userRoutes;
