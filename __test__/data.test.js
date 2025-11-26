const request = require("supertest");
const app = require("../src/api");

describe("Static File Serving", () => {
  it("should serve index.html for root path", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("text/html");
    } catch (error) {
      throw new Error("Serving index.html file failed");
    }
  });
});
