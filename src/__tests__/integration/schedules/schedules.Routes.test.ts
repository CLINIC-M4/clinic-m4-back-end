import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAdminLogin, mockedAdmin } from "../../mocks/users";

import { mockedSchedule } from "../../mocks/schedules";
import { IDoctorRegister } from "../../../interfaces/doctor/doctor";

const mockedDoctor: IDoctorRegister = {
  name: "Doctor",
  email: "doctor@gmail.com",
  crm: "12312312312",
  password: "123456",
};

jest.setTimeout(30000);

describe("/schedules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdmin);
    await request(app).post("/doctor").send(mockedDoctor);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules -  Should be able to create a schedule", async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = doctors.body[0].id;

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);
    expect(response.body).toHaveProperty("schedule");
    expect(response.status).toBe(201);
  });

  test("POST /schedules -  should not be able to create a schedule that already exists", async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = doctors.body[0].id;

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test('POST /schedules -  Should not be able to create a schedule with an invalid date', async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = doctors.body[0].id;
    mockedSchedule.date = '30/10/2022'

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /schedules -  Should not be able to create a schedule with an invalid hour < 8', async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = doctors.body[0].id;
    mockedSchedule.hour = '7:50'

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /schedules -  should not be able to create a schedule with an invalid hour > 18', async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = doctors.body[0].id;
    mockedSchedule.hour = '18:50'

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /schedules -  should not be able to create a schedule with an invalid doctor id', async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    const userLoginResponse = await request(app)
      .post("/login/users")
      .send(mockedAdminLogin);

    mockedSchedule.doctorId = '345345345-345-345-34534-5'

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('POST /schedules -  should not be able to create a schedule without authentication', async () => {
    const doctor = await request(app).post("/login/doctor").send(mockedDoctor);
    const doctors = await request(app)
      .get("/doctor")
      .set("Authorization", `Bearer ${doctor.body.token}`);

    mockedSchedule.doctorId = doctors.body[0].id;

    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${'dfgdgdfg'}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  // test('GET /schedules/properties/:id -  must be able to list the schedules of a property', async () => {
  //   const adminLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedAdminLogin);
  //   const properties = await request(app).get('/properties');
  //   const response = await request(app)
  //     .get(`/schedules/properties/${properties.body[0].id}`)
  //     .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

  //   expect(response.body).toHaveProperty('schedules');
  //   expect(response.body.schedules[0]).toHaveProperty('id');
  //   expect(response.body.schedules[0]).toHaveProperty('date');
  //   expect(response.body.schedules[0]).toHaveProperty('hour');
  //   expect(response.body.schedules[0]).toHaveProperty('user');
  //   expect(response.body.schedules).toHaveLength(1);

  //   expect(response.status).toBe(200);
  // });

  // test('GET /schedules/properties/:id -  should not be able to list the schedules of a property with invalid id', async () => {
  //   const adminLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedAdminLogin);
  //   const response = await request(app)
  //     .get(`/schedules/properties/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
  //     .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(404);
  // });

  // test('GET /schedules/properties/:id -  should not be able to list the schedules of a property without authentication', async () => {
  //   const properties = await request(app).get('/properties');
  //   const response = await request(app).get(
  //     `/schedules/properties/${properties.body[0].id}`
  //   );

  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(401);
  // });

  // test('GET /schedules/properties/:id -  should not be able to list the schedules of a property that the user is not admin', async () => {
  //   const userLoginResponse = await request(app)
  //     .post('/login')
  //     .send(mockedUserLogin);
  //   const properties = await request(app).get('/properties');
  //   const response = await request(app)
  //     .get(`/schedules/properties/${properties.body[0].id}`)
  //     .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

  //   expect(response.body).toHaveProperty('message');
  //   expect(response.status).toBe(403);
  // });
});
