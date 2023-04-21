import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export const Register = ({ user, setUser }) => {

    const navigate = useNavigate();

    const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData.entries());

      const logging = async () => {
        await fetch("http://localhost:4444/auth/register", {
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
            console.log(data);
            setUser({ ...data, isLoggedIn: true });
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      logging();
    };

      return (
        <div>
          {user.isLoggedIn ? (
            <h4>Регистрация выполнена успешно</h4>
          ) : (
            <>
              <h4>Регистрация</h4>
              <form className={styles.form} onSubmit={onSubmit}>
                <input className={styles.input} type="text" name="username" placeholder="Введите логин" />
                <input className={styles.input} type="email" name="email" placeholder="Введите email" />
                <input className={styles.input} type="password" name="password" placeholder="Введите пароль" />
                <button type="submit" className={styles.btn}>
                  Зарегистрироваться
                </button>
              </form>
            </>
          )}
        </div>
      );
};
