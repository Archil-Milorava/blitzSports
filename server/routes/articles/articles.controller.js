import mongoose from "mongoose";
import cloudinary from "../../config/cloudinary.js";


import Article from "../../models/articleModel.js";
import User from "../../models/userModel.js";

export const getLandingNews = async (req, res) => {
  try {
    const news = await Article.find({ badge: "news" })
      .sort({ createdAt: -1 })
      .limit(6);

    if (!news) {
      return res.status(400).json({ message: "could not find news" });
    }

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getLandingHistories = async (req, res) => {
  try {
    const histories = await Article.find({ badge: "history" })
      .sort({ createdAt: -1 })
      .limit(6);

    if (!histories) {
      return res.status(400).json({ message: "could not find histories" });
    }

    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPaginatedNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const news = await Article.find({ badge: "news" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments({ badge: "news" });

    res.json({
      articles: news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPaginatedHistories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const histories = await Article.find({ badge: "history" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments({ badge: "history" });

    res.json({
      articles: histories,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getArticlesByCategory = async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const articles = await Article.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments({ category });

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid article ID" });
  }
  try {
    const news = await Article.findById(id).populate(
      "author",
      "avatar fullName"
    );

    if (!news) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching article" });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, content, badge, category, author, twitterLink } = req.body;
    let { imageUrl } = req.body;

    if (!title || !content || !badge || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (imageUrl) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
          folder: "articles",
        });
        imageUrl = uploadResponse.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const newArticle = new Article({
      title,
      content,
      imageUrl: imageUrl || "",
      badge,
      category: category || "",
      twitterLink: twitterLink || "",
      author,
    });

    const savedArticle = await newArticle.save();

    await User.findByIdAndUpdate(author, {
      $push: { articles: savedArticle._id },
    });

    res.status(201).json({ message: "Article created", article: savedArticle });
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const updates = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(articleId, updates, {
      new: true,
    });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteAll =async (req, res) => {
  try {
    await Article.deleteMany()
    res.send("deleted")
  } catch (error) {
    console.log(error);
    
  }
}
