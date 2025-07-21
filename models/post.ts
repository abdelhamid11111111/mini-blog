import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  userEmail: string; // ✅ use email instead of userId
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    userEmail: { type: String, required: true }, // ✅
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
