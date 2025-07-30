import express from "express";
import {
  createArticle,
  getArticlesByCategory,
  getLandingHistories,
  getLandingNews,
  getPaginatedHistories,
  getPaginatedNews,
  updateArticle,
} from "./articles.controller.js";

const articleRoute = express.Router();

articleRoute.get("/landing/news", getLandingNews);
articleRoute.get("/landing/histories", getLandingHistories);
articleRoute.get("/news", getPaginatedNews);
articleRoute.get("/histories", getPaginatedHistories);
articleRoute.get("/category/:category", getArticlesByCategory);

articleRoute.post("/create", createArticle);
articleRoute.patch("/update/:id", updateArticle);

export default articleRoute;
