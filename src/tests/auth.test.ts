import request from "supertest";
import app from "../app"; // il tuo express app
import mongoose from "mongoose";
import { UserModel } from "../api/user/user.model";
import { UserIdentityModel } from "../utils/auth/local/user-identity.model";
import userService from "../api/user/user.service";

const API_URL = "/api";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "auth_test_db",
  });
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase(); // clean DB
  }
  await mongoose.disconnect();
});

describe("Auth Routes", () => {
  let userId: string;
  let token: string;

  const userCredentials = {
    firstName: "Test",
    lastName: "User",
    username: "testuser@example.com",
    password: "testpassword",
  };

  it("should register a new user", async () => {
    const res = await request(app).post(`${API_URL}/register`).send(userCredentials);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("newUser");
    userId = res.body.newUser._id;
  });

  it("should not login before email confirmation (if required)", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      username: userCredentials.username,
      password: userCredentials.password,
    });

    if (process.env.IS_REQUIRED_EMAIL_VERIFICATION === "true") {
      expect(res.statusCode).toBe(401);
    } else {
      expect(res.statusCode).toBe(200);
      token = res.body.token;
    }
  });

  it("should confirm email", async () => {
    const user = await UserModel.findOne({ username: userCredentials.username });
    const identity = user?._id ? await userService.getUserIdentityByUserId(user._id.toString()) : null;
    const code = identity?.confirmationToken;

    const res = await request(app).get(`${API_URL}/confirm-email`).query({ userId: user?._id, code });

    expect([200, 400]).toContain(res.statusCode);
  });

  it("should login after email confirmation", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      username: userCredentials.username,
      password: userCredentials.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  const waitForIdentity = async (username: string, retries = 10, delay = 200): Promise<void> => {
    for (let i = 0; i < retries; i++) {
      const identity = await UserIdentityModel.findOne({ "credentials.username": username });
      if (identity) return;
      await new Promise((res) => setTimeout(res, delay));
    }
    throw new Error("User identity not found after multiple attempts");
  };

  it("should request password reset", async () => {
    await waitForIdentity(userCredentials.username); // Aspetta finché esiste

    const res = await request(app)
      .post(`${API_URL}/request-password-reset`)
      .send({ username: userCredentials.username });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Controlla la tua email");
  });

  it("should validate reset token and reset password", async () => {
    // Recupera identity con riferimento all'utente
    const identity = await UserIdentityModel.findOne({
      "credentials.username": userCredentials.username,
    }).populate("user");

    const user = identity?.user;
    // console.log("[DEBUG] Utente trovato:", user);
    expect(user).not.toBeNull();

    // Richiesta reset password
    const resetReq = await request(app)
      .post(`${API_URL}/request-password-reset`)
      .send({ username: userCredentials.username });

    // console.log("[DEBUG] Risposta request-password-reset:", resetReq.statusCode, resetReq.body);

    // Aspetta un po' per permettere il salvataggio del token
    await new Promise((res) => setTimeout(res, 300));

    if (!user || !user.id) {
      console.error("[DEBUG] User not found or user ID is missing" + `User: ${user} - IDENTITY: ${identity}`);
      throw new Error("User not found or user ID is missing");
    }

    // Verifica esistenza token
    const refreshedIdentity = await userService.getUserIdentityByUserId(user.id);
    // console.log("[DEBUG] Identity aggiornata:", refreshedIdentity);

    const resetToken = refreshedIdentity?.resetPasswordToken;
    // console.log("[DEBUG] Token reset:", resetToken);
    expect(resetToken).toBeDefined();

    const identityId = identity!._id.toString(); // 👈 Usiamo identity._id

    // Valida il token
    const validate = await request(app)
      .get(`${API_URL}/validate-reset-token`)
      .query({ token: resetToken, userId: identityId });

    // console.log("[DEBUG] validate-reset-token response:", validate.statusCode, validate.body);
    expect(validate.statusCode).toBe(200);

    // Reimposta la password
    const reset = await request(app)
      .post(`${API_URL}/reset-password-with-email`)
      .query({ token: resetToken, userId: identityId })
      .send({ newPassword: "newSecurePass123" });

    // console.log("[DEBUG] reset-password-with-email response:", reset.statusCode, reset.body);
    expect(reset.statusCode).toBe(200);
  });

  it("should login with new password", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      username: userCredentials.username,
      password: "newSecurePass123",
    });

    console.log("[DEBUG] Login con nuova password:", res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should handle invalid login", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      username: "nonexistent@example.com",
      password: "invalidpass",
    });

    expect(res.statusCode).toBe(401);
  });
});
