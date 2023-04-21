import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export const MovieCreate = ({ getAllMovies }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values.genres = values.genres.split(", ");
    console.log(values);

    const createMovie = async () => {
      await fetch("http://localhost:4444/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(res);
        })
        .then((data) => {
          getAllMovies();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    createMovie();
  };

  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.headerTitle}>Создать фильм</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input} type="text" name="title" placeholder="Введите название" required />
        <input className={styles.input} type="number" name="year" placeholder="Введите год выхода" required />
        <input className={styles.input} type="text" name="director" placeholder="Введите режиссера" required />
        <input className={styles.input} type="text" name="tagline" placeholder="Введите слоган" />
        <input className={styles.input} type="text" name="genres" placeholder="Введите жанры" required />
        <button className={styles.btn} type="submit">
          Создать
        </button>
      </form>
    </div>
  );
};
