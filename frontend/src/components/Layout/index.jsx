import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./style.module.css";

export const Layout = ({ user }) => {
  return (
    <div className={styles.root}>
      <div>{user.isLoggedIn ? <h3>Добро пожаловать, {user.username}</h3> : <h3>Добро пожаловать, гость</h3>}</div>
      <nav className={styles.nav}>
        <Link className={styles.navBtn} to="/">
          Главная
        </Link>
        <Link className={styles.navBtn} to="/movies">
          Фильмы
        </Link>

        {user.isLoggedIn ? (
          <>
            <Link className={styles.navBtn} to="/profile">
              Профиль
            </Link>
            <Link className={styles.navBtn} to="/logout">
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.navBtn} to="/login">
              Войти
            </Link>

            <Link className={styles.navBtn} to="/register">
              Зарегистрироваться
            </Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};
