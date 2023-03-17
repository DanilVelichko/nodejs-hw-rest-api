const request = require("supertest");
const app = require("../app");

describe("Login User", () => {
  test("should return a token and user with email and subscription", async () => {
    const req = {
      body: {
        email: "test@test.com",
        password: "12345678",
      },
    };

    const response = await request(app).get("/api/users/login").send({
      email: "test@test.com",
      password: "12345678",
    });

    console.log(response.status);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("email", "test@test.com");
    expect(response.body.user).toHaveProperty("subscription", "starter");
  }, 30000);
});
