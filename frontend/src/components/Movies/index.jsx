import React from "react";
import { MovieSelect } from "./MovieSelect";
import { MovieCreate } from "./MovieCreate";
import { MovieList } from "./MovieList";
import styles from "./style.module.css";

export const Movies = ({ user, movies, getAllMovies, getWatchedMovies }) => {
  return (
    <div className={styles.contentContainer}>
      {user.isLoggedIn ? (
        <>
          {user.role === "USER" ? (
            <MovieSelect user={user} movies={movies} getWatchedMovies={getWatchedMovies} />
          ) : (
            <>
              <MovieCreate getAllMovies={getAllMovies} />
              <MovieList movies={movies} />
            </>
          )}
        </>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};
