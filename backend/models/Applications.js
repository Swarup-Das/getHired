import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  coverLetter: {
    type: String,
  },
  experience: {
    type: Number, // year
  },
  aboutApplicant: {
    type: String,
  },
});
