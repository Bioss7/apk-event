import { useState } from "react";
import { Select, Input, Button } from "@shared/ui";
import loginImg from "@assets/images/login.png";
import logo from "@assets/images/logo.png";
import "./styles.scss";

const options = [
  { label: "Администратор", value: "admin" },
  { label: "Пользователь", value: "user" },
];

export const AuthForm = () => {
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    setDescription("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || "Неверный пароль";
        setError(true);
        setDescription(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Успешная авторизация:", data);
    } catch (err) {
      setError(true);
      setDescription(
        err instanceof Error ? err.message : "Произошла неизвестная ошибка"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <div className="auth__img">
          <img src={loginImg} alt="banner" />
        </div>
        <form className="auth__content" onSubmit={handleSubmit}>
          <img src={logo} alt="logo" />
          <Select
            label="Логин"
            options={options}
            value={login}
            onChange={setLogin}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={setPassword}
            error={error}
            description={error ? description : undefined}
          />
          <Button variant="button-primary" type="submit" disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
};
