import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    contact: { type: String, default: "" },
    password: { type: String },
    fullname: { type: String, required: true },
    googleId: { type: String, default: null },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const Usermodel = mongoose.model("user", userSchema);

export default Usermodel;