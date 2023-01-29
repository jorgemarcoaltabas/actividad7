Como documente y testee con jest: 
npm install --save-dev jest supertest

Create a new file in your project's root directory named jest.config.js and configure Jest to work with your Express app.

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
};


When testing an Express app with different routers using Jest, you can use the supertest library to make requests to the routes and assert that the correct responses are returned. Here is an example of how you can test an app with multiple routers:

Create a new file in your project's test directory, for example routes.test.js and import the necessary modules:
javascript
Copy code
const request = require('supertest');
const app = require('../server');
const firstRouter = require('../routes/firstRouter');
const secondRouter = require('../routes/secondRouter');
In the routes.test.js file, mount the routers to the app:
php
Copy code
app.use('/first', firstRouter);
app.use('/second', secondRouter);
Write test cases for the routes inside the routers. For example, to test a GET route that returns a specific item from the first router:


test('GET /first/items/:id', async () => {
    const response = await request(app).get('/first/items/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'item1' });
});
Write test cases for the routes inside the second router:

test('GET /second/items/:id', async () => {
    const response = await request(app).get('/second/items/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 2, name: 'item2' });
});


When testing an Express app that uses JSON Web Token (JWT) for authorization with Jest, you can use the supertest library to make requests to the routes and assert that the correct responses are returned. Here is an example of how you can test an app that uses JWT for authorization:

Create a new file in your project's test directory, for example routes.test.js and import the necessary modules:

const request = require('supertest');
const app = require('../server');
const authRouter = require('../routes/authRouter');
const protectedRouter = require('../routes/protectedRouter');
In the routes.test.js file, mount the routers to the app:

app.use('/auth', authRouter);
app.use('/protected', protectedRouter);
Write test cases for the routes inside the auth router. For example, to test a POST route that authenticates a user and returns a JWT:

test('POST /auth/login', async () => {
    const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
});
Write test cases for the routes inside the protected router that need authorization. For example, to test a GET route that returns a specific item:

test('GET /protected/items/:id', async () => {
    const authResponse = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

    const token = authResponse.body.token;
    const response = await request(app)
        .get('/protected/items/1')
        .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'item1' });
});
Run the test cases by running the command npm test or jest in your terminal.


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


 copio pagina tutorial basico para jest aqui:
 Opening
If you've been scratching your head trying to test your new TypeScript Express API - I've been there. And I'd love to save you some time.

I was trying my hand at converting a Node and Express api to use TypeScript. All was going well until I got to testing and I started having all of these existential questions. Like do I need to 'build' my test files?, do my config files need to be 'built'?, and why did i decide to use TypeScript when my API already worked!?.

This article can answer some of those questions. It also assumes you know a little bit about the technologies the project uses (TypeScript, Node, Express, SuperTest, and Jest) - this is more of a project structure guide than an in-depth look at the technologies used.

Initialize project and import the imports
Create a directory for your project and cd into it.
Use NPM to initialize the project npm init -y.
Import dependencies npm i express.
Import dev-dependencies npm i --save-dev typescript supertest nodemon jest ts-jest ts-node @types/jest @types/supertest @types/express.
Initialize TypeScript
Now let's add TypeScript to our project.
npx tsc --init
The above command will generate a tsconfig.json file.
Image description
You'll want to modify it with the below. Not every item is necessary, feel free to further configure it to match your needs.
A quick note on the exclude value, these are files that the build will ignore. Not all of them exist yet ;)
{
  "exclude": ["./coverage", "./dist", "__tests__", "jest.config.js"],
  "ts-node": {
    "transpileOnly": true,
    "files": true
  },
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "checkJs": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  }
}
Initialize Jest
Up next, we want to add the Jest testing framework to our project.
npx ts-jest config:init
The above command will generate a jest.config.js file. You'll want to modify it with the below, so it works with ts-jest (this is what makes jest work with TypeScript).

Image description
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
Create a basic Express app with TypeScript
We'll need to create a src directory with two TypeScript files in it: app.ts and server.ts. In the src directory, we want to add another directory: routes. In the routes directory we want to add a user.routes.ts file.
Image description

app.ts
import express, { Application, Request, Response, NextFunction } from "express";

import { router as userRoutes } from "./routes/user.routes";

const app: Application = express();

app.use("/users", userRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Allo! Catch-all route." });
});

export default app;
server.ts
import app from "./app";

const PORT: Number = 5050;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
user.routes.ts
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  let users = ["Goon", "Tsuki", "Joe"];
  res.status(200).send(users);
});

export { router };
Configure package.json
Let's configure our package.json to use our new tools! To the scripts section add the following:
scripts: {
  "test": "jest --coverage",
  "dev": "nodemon ./src/server.ts",
  "build": "tsc"
}
Making sure our API is working
Now let's be sure we haven't made any mistakes so far. Run the command npm run dev. Open a browser and go to http://localhost:5050/. You should be greeted with the welcome message we defined on line 10 of app.js Allo! Catch-all route.. Now try out our user route http://localhost:5050/users, where you should find a list of our users from user.routes.ts ["Goon", "Tsuki", "Joe"].

Writing our tests
Now for the moment you've been waiting for... testing.
in our project add a __tests__ directory. In that directory we'll duplicate the file structure we made in the src directory. Creating a app.test.ts, server.test.ts, and routes/user.routes.test.ts.
Image description.