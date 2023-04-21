import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";
import { Profile } from "./components/Profile";
import { Movies } from "./components/Movies";

function App() {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [movies, setMovies] = useState([]);

  // console.log("admin; admin123; ADMIN");
  // console.log("user321; user54321; USER");

  const getAllMovies = async () => {
    await fetch("http://localhost:4444/movies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWatchedMovies = async () => {
    if (user.isLoggedIn) {
      await fetch(`http://localhost:4444/user/${user._id}/movies`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then((data) => {
          setUser({ user, data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUser = async () => {
    if (!user.isLoggedIn && Cookies.get("access_token")) {
      await fetch("http://localhost:4444/user", {
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(res);
        })
        .then((data) => {
          console.log(data);
          setUser({ ...data, isLoggedIn: true });
        }).catch((err) => {
          console.log(err);
        })
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      getAllMovies();
    }

    getUser();
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout user={user} />}>
        <Route index path="/" element={<h3>Сервис для отслеживания просмотренных фильмов</h3>} />
        <Route path="/profile" element={<Profile user={user} getMovies={getWatchedMovies} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        <Route
          path="/movies"
          element={
            <Movies user={user} movies={movies} getAllMovies={getAllMovies} getWatchedMovies={getWatchedMovies} />
          }
        />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
