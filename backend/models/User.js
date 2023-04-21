import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 32,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    watched: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
