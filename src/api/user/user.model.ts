import mongoose from "mongoose";
import { User } from "./user.entity";

const addressInfo = new mongoose.Schema({
  address: { type: String || undefined, default: undefined },
  city: { type: String || undefined, default: undefined },
  state: { type: String || undefined, default: undefined },
  country: { type: String || undefined, default: undefined },
  zipCode: { type: String || undefined, default: undefined },
  location: {
    latitude: { type: Number || undefined, default: undefined },
    longitude: { type: Number || undefined, default: undefined },
  },
});

const userSchema = new mongoose.Schema<User>({
  // Informazioni Personali di Base
  firstName: String,
  lastName: String,
  picture: { type: String || undefined, default: undefined },
  birthDate: { type: Date || String || undefined, default: undefined },
  gender: { type: String || undefined, default: undefined },

  // Preferenze
  preferredLanguage: { type: String || undefined, default: undefined },
  timeZone: { type: String || undefined, default: undefined },
  addressInfo: addressInfo,

  // Stato Utente
  isActive: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  status: { type: String || undefined, default: undefined },

  // Timestamp di Attività
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: undefined },
  lastLogin: { type: Date, default: undefined },
  lastAllowedIp: { type: String || undefined, default: undefined },
  allowedIps: { type: [String], default: [] },

  resetPasswordToken: { type: String || undefined, default: undefined },
  resetPasswordExpires: {
    type: Date || String || undefined,
    default: undefined,
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
