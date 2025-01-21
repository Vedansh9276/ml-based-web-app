import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  testResults: [
    {
      testType: { type: String, required: true },
      score: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      details: { type: mongoose.Schema.Types.Mixed },
    },
  ],
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)

