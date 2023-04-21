import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export const MovieSelect = ({ user, movies, getWatchedMovies }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const addingMovie = async () => {
      await fetch(`http://localhost:4444/user/${user._id}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then(() => {
          getWatchedMovies();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    addingMovie();
  };

  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.headerTitle}>Отметить фильм</h3>
      <div>
        <form className={styles.form} onSubmit={onSubmit}>
          <select className={styles.input} name="watched">
            <option key="null" value="null"></option>
            {movies?.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title} ({movie.year})
              </option>
            ))}
          </select>
          <button className={styles.btn} type="submit">
            Отметить
          </button>
        </form>
      </div>
    </div>
  );
};
