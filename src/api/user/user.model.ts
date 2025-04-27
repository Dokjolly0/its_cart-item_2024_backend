import mongoose from "mongoose";
import { User } from "./user.entity";

const userSchema = new mongoose.Schema<User>({
  // Informazioni Personali di Base
  firstName: String,
  lastName: String,
  picture: { type: String || null, default: null },
  birthDate: { type: Date || String || null, default: null },
  gender: { type: String || null, default: null },

  // Informazioni sull'Indirizzo (Opzionale)
  addressInfo: {
    address: String || null,
    city: String || null,
    state: String || null,
    country: String || null,
    zipCode: String || null,
    location: {
      latitude: { type: Number || null, default: null },
      longitude: { type: Number || null, default: null },
    },
  },

  // Preferenze
  preferredLanguage: { type: String || null, default: null },
  timeZone: { type: String || null, default: null },

  // Stato Utente
  isActive: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  status: { type: String || null, default: null },

  // Timestamp di Attività
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  lastLogin: { type: Date, default: null },

  resetPasswordToken: { type: String || null, default: null },
  resetPasswordExpires: {
    type: Date || String || null,
    default: null,
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
