import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setUser }) => {
        const navigate = useNavigate();

  useEffect(() => {
    const loggingOut = async () => {
      await fetch("http://localhost:4444/auth/logout", {
        method: "POST",
        credentials: "include",
      }).then((res) => {
        setUser({ isLoggedIn: false });
        navigate("/");
      });
    };

    loggingOut();
  });

  return (<div>Вы вышли из аккаунта</div>);
};
