import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    badge: {
      type: String,
      enum: ["news", "history"],
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    twitterLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
