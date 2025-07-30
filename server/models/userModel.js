import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    nickName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    roles: {
      type: [String],
      enum: ["admin", "author", "user"],
      default: ["user"],
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
