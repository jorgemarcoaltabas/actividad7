import request from "supertest";

import { app } from "../../../../src/app";

import { routerUsers } from "../../../../src/users/infrastructure/rest/users.router";

app.use("/users", routerUsers)

/**
 * Documento para mi esto:
 * puedo tener varios test dentro de un describe,
 * en estos test puedo simular el conseguir el token con sea como sea que consiga mi token normalment,
 * en este caso es con un post a /users/login que devuelve en la respuesta el token,
 * simulo que envio los datos correctos para conseguir este token 
 * despues utilizo este token en mi get correspondiente dandole el header con .set("Authorization", Bearer ${token})
 * 
 * importante resalta el hecho de que el importar la parte de app solo me sirvió con namespaces,
 *  ninguna otra forma de importar parecia traerse
 * el objeto con sus metodos bien
 */

describe("User routes", () => {
    test('GET /users/all', async () => {
        const authResponse = await request(app)
            .post("/users/login")
            .send({
                "name": "TomasUser",
                "password": "123321"
            })

        const token = authResponse.body.token;
        const res = await request(app)
            .get("/users/all")
            .set('Authorization', `Bearer ${token}`);
        console.log(res.body)
        expect(res.statusCode).toBe(200);
    });
    test('GET /users/', async () => {
        const authResponse = await request(app)
            .post("/users/login")
            .send({
                "name": "TomasUser",
                "password": "123321"
            })

        const token = authResponse.body.token;
        const res = await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${token}`);
        console.log(res.body)
        expect(res.statusCode).toBe(200);
    });
});

