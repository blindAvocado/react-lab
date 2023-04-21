import React from "react";
import styles from "./style.module.css";

export const MovieList = ({ movies }) => {
  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.headerTitle}>Список фильмов в БД:</h3>
      <ul>
        {movies?.map((movie) => (
          <li className={styles.movie} key={movie._id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
};
