import request from "supertest";

import { app } from "../../../../src/app";

import { routerVideogames } from "../../../../src/videogames/infrastructure/rest/videogames.router";

app.use("/videogames", routerVideogames)

describe("videogames routes", () => {
    test('GET /videogames', async () => {
        const res = await request(app).get("/videogames")
        console.log(res.body)
        expect(res.statusCode).toBe(200);
    });
});