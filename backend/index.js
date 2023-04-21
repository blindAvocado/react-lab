import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { loginValidation, registerValidation } from "./utils/validations.js";
import checkAuth from './utils/checkAuth.js';
import * as AuthController from "./controllers/AuthController.js";
import * as UserController from "./controllers/UserController.js";
import * as MovieController from "./controllers/MovieController.js";

mongoose.connect("mongodb://localhost:27017/lab5")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error", err));

const app = express();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true, exposedHeaders: ["access_token"] }));
app.use(express.json());

app.get("/users", UserController.getAllUsers);
// app.post("/users", UserController.create);
// app.delete("/users/:id", UserController.remove);
app.post("/auth/logout", checkAuth, AuthController.logout);
app.post("/auth/login", loginValidation, AuthController.login);
app.post("/auth/register", registerValidation, AuthController.register);
app.get("/user", checkAuth, UserController.getMe);
app.get("/user/:id/movies", UserController.getWatchedFilms);
app.post("/user/:id/movies", UserController.addWatchedFilms);

app.get("/movies", MovieController.getAllMovies);
app.post("/movies", MovieController.create);
app.delete("/movies/:id", MovieController.remove);

// UserController.seeder();

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Listening on port 4444');
})

