import User from "../../models/userModel.js";
import Article from "../../models/articleModel.js";

export const getMyArticles = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("articles");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.articles) {
      return res.status(400).json({ message: "articles not found" });
    }

    res.json(user.articles);
  } catch (err) {
    console.error("Error fetching user's articles:", err);
    res.status(500).json({ message: "Server error" });
  }
};
