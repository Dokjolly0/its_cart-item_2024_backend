import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { UserModel } from "../api/user/user.model";
import { UserIdentityModel } from "../utils/auth/local/user-identity.model";
import userService from "../api/user/user.service";

const API_URL = "/api";

let token: string;
let userId: string;

const userCredentials = {
  firstName: "Admin",
  lastName: "User",
  username: "admin@example.com",
  password: "adminPass123",
  role: "admin",
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "user_test_db",
  });

  // Create admin user
  await request(app).post(`${API_URL}/register`).send(userCredentials);
  const user = await UserModel.findOne({ firstName: "Admin" });
  if (user) {
    await userService.verifyConfirmationToken(
      user.id!,
      (
        await userService.getUserIdentityByUserId(user.id!)
      )?.confirmationToken!
    );
  }

  const login = await request(app).post(`${API_URL}/login`).send({
    username: userCredentials.username,
    password: userCredentials.password,
  });

  token = login.body.token;
  userId = login.body.user.id;
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.disconnect();
});

describe("User Routes", () => {
  it("GET /me - should return current user info", async () => {
    const res = await request(app).get(`${API_URL}/users/me`).set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("firstName", "Admin");
  });

  it("GET /users - should return list of users (admin only)", async () => {
    const res = await request(app).get(`${API_URL}/users/users`).set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET /find/:id - should return a specific user by ID", async () => {
    const res = await request(app)
      .get(`${API_URL}/users/find/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", userId);
  });

  it("POST /reset-password - should change password for current user", async () => {
    const res = await request(app)
      .post(`${API_URL}/users/reset-password`)
      .set("Authorization", `Bearer ${token}`)
      .send({ newPassword: "newAdminPass123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password updated");
  });

  it("GET /validate-password/:oldPassword - should validate old password", async () => {
    const res = await request(app)
      .get(`${API_URL}/users/validate-password/newAdminPass123`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password is valid");
  });

  // it("GET /picture - should return 404 or serve image", async () => {
  //   const res = await request(app).get(`${API_URL}/users/picture`).set("Authorization", `Bearer ${token}`);

  //   expect([200, 404]).toContain(res.statusCode);
  // });

  it("should login with new password after reset", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      username: userCredentials.username,
      password: "newAdminPass123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
