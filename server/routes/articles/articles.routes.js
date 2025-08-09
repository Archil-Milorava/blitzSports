import express from "express";
import {
  createArticle,
  deleteAll,
  getArticle,
  getArticlesByCategory,
  getLandingHistories,
  getLandingNews,
  getPaginatedHistories,
  getPaginatedNews,
  updateArticle
} from "./articles.controller.js";

const articleRoute = express.Router();

articleRoute.get("/landing/news", getLandingNews);
articleRoute.get("/landing/histories", getLandingHistories);
articleRoute.get("/news", getPaginatedNews);
articleRoute.get("/histories", getPaginatedHistories);
articleRoute.get("/category/:category", getArticlesByCategory);
articleRoute.delete("/delete", deleteAll);

articleRoute.post("/create", createArticle);
articleRoute.patch("/update/:id", updateArticle);
articleRoute.get("/:id", getArticle);

export default articleRoute;
