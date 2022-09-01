import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    skills: [{ type: String }],
    salary: {
      type: Number,
    },
    jobType: {
      type: String,
    },
    appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
