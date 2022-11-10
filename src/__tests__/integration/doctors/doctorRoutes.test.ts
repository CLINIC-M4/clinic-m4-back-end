import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedDoctor,
  mockedDoctorLogin,
  mockedDoctorNotName,
  mockedDoctorNotPassword,
} from "../../mocks/doctors";

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
    const response = await request(app)
      .post("/doctor")
      .send(mockedDoctorNotName);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("name is a required field");
    expect(response.status).toBe(400);
  });

  test("POST /doctor -  Should not be able to create a doctor that not exists password in body", async () => {
    const response = await request(app)
      .post("/doctor")
      .send(mockedDoctorNotPassword);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("password is a required field");
    expect(response.status).toBe(400);
  });

  test("GET /doctor -  Must be able to list doctors", async () => {
    await request(app).post("/doctor").send(mockedDoctor);
    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  test("GET /doctor -  Should not be able to list doctors without authentication", async () => {
    const response = await request(app).get("/doctor");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /doctor/:id -  Should not be able to update doctor without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const doctorTobeUpdate = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    const response = await request(app).patch(
      `/doctor/${doctorTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /doctor/:id - Should not be able to update doctor with invalid id", async () => {
    const newValues = {
      name: "Enrico Freitas",
      email: "enricofreitas12@gmail.com",
    };

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const token = `Bearer ${loginResponse.body.token}`;

    const doctorTobeUpdateRequest = await request(app)
      .get("/doctor")
      .set("Authorization", token);
    const doctorTobeUpdateId = doctorTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/doctor/32957463-d4i5-au53-pl12-7ad23b4948of`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /doctor/:id - Should not be able to update isAdm field value", async () => {
    const newValues = { isAdm: false };

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const token = `Bearer ${loginResponse.body.token}`;

    const doctorTobeUpdateRequest = await request(app)
      .get("/doctor")
      .set("Authorization", token);
    const doctorTobeUpdateId = doctorTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/doctor/${doctorTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /doctor/:id - Should not be able to update isActive field value", async () => {
    const newValues = { isActive: false };

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const token = `Bearer ${loginResponse.body.token}`;

    const doctorTobeUpdateRequest = await request(app)
      .get("/doctor")
      .set("Authorization", token);
    const doctorTobeUpdateId = doctorTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/doctor/${doctorTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /doctor/:id - Should not be able to update id field value", async () => {
    const newValues = { id: false };

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const token = `Bearer ${loginResponse.body.token}`;

    const doctorTobeUpdateRequest = await request(app)
      .get("/doctor")
      .set("Authorization", token);
    const doctorTobeUpdateId = doctorTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/doctor/${doctorTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /login/doctor -  should be able to login with the doctor", async () => {
    const response = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login/doctor -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login/doctor").send({
      email: "enricofreitas@gmail.com",
      password: "enrico000",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /doctor/:id -  Should not be able to delete doctor without authentication", async () => {
    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const doctorTobeDeleted = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/doctor/${doctorTobeDeleted.body[0].id}`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /doctor/:id -  Must be able to soft delete a doctor", async () => {
    await request(app).post("/doctor").send(mockedDoctor);

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const doctorDelete = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .delete(`/doctor/${doctorDelete.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    const doctorFind = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(200);
    expect(doctorFind.body[0].isActive).toBe(false);
  });

  test("DELETE /doctor/:id-  Should not be able to delete doctor with invalid id", async () => {
    await request(app).post("/doctor").send(mockedDoctor);

    const loginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);

    const response = await request(app)
      .delete(`/doctor/32957463-d4i5-au53-pl12-7ad23b4948of`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /doctor/exams/register -  Should be able to list all exams", async () => {
    await request(app).post("/doctor").send(mockedDoctor);
    const adminLoginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .get("/doctor/exams")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty("resultado");
    expect(response.status).toBe(200);
  });

  test("POST /doctor/exams/register -  Should be able to create exam", async () => {
    const adminLoginResponse = await request(app)
      .post("/login/doctor")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post("/doctor/exams/register")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("doctor_id");
    expect(response.body).toHaveProperty("user_id");
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await connection.destroy();
  });
});
