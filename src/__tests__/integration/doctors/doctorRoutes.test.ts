import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedDoctor, mockedDoctorLogin, mockedDoctorNotName, mockedDoctorNotPassword, mockedUserNotCrm } from "../../mocks/doctors";

describe("/doctor", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /doctor -  Must be able to create a doctor", async () => {
    const response = await request(app).post("/doctor").send(mockedDoctor);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual(mockedDoctor.name);
    expect(response.body.email).toEqual(mockedDoctor.email);
    expect(response.body.isAdm).toEqual(true);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /doctor -  Should not be able to create a doctor that already exists", async () => {
    const response = await request(app).post("/doctor").send(mockedDoctor);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("This email is already in use");
    expect(response.status).toBe(409);
  });

  test("POST /doctor -  Should not be able to create a doctor that not exists name in body", async () => {
    const response = await request(app).post("/doctor").send(mockedDoctorNotName);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("name is a required field");
    expect(response.status).toBe(400);
  });

  test("POST /doctor -  Should not be able to create a doctor that CPF is invalid", async () => {
    const response = await request(app)
      .post("/doctor")
      .send(mockedUserNotCrm);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("crm is a required field");
    expect(response.status).toBe(400);
  });

  test("POST /doctor -  Should not be able to create a doctor that not exists password in body", async () => {
    const response = await request(app).post("/doctor").send(mockedDoctorNotPassword);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("password is a required field");
    expect(response.status).toBe(400);
  });

  test("GET /doctor -  Must be able to list doctors", async () => {
    await request(app).post("/doctor").send(mockedDoctor);
    const adminLoginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctor);
    const response = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /doctor -  Should not be able to list doctors without authentication", async () => {
    const response = await request(app).get("/doctor");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
