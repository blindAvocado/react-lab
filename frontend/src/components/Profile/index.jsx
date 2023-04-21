import React from "react";
import styles from "./style.module.css";

export const Profile = ({ user }) => {
  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.headerTitle}>Профиль</h3>
      <ul>
        <li className={styles.userDataLabel} key={user.username}>
          Username:&nbsp;
          <span className={styles.userData}>{user.username}</span>
        </li>
        <li className={styles.userDataLabel} key={user.email}>
          Email:&nbsp;
          <span className={styles.userData}>{user.email}</span>
        </li>
        <li className={styles.userDataLabel} key={user.role}>
          Role:&nbsp;
          <span className={styles.userData}>{user.role}</span>
        </li>
        {user.role === "USER" && (
          <>
            <li className={styles.userDataLabel} key={user._id}>
              Watched:{" "}
              <ul className={styles.movieList}>
                {user.watched?.map((movie) => (
                  <li className={styles.movie} key={movie.title}>
                    {movie.title} ({movie.year})
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
