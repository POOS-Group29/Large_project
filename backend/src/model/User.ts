import { Document, Schema, Model, model } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  isAdmin: boolean;
  matchPasswords: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password: string) {
  return await compare(password, this.password);
};

const User: Model<IUser> = model("User", userSchema);

export default User;
