import styled from "./Header.module.scss";
import { useEffect, useState } from "react";
import sun from "../../assets/icon-sun.svg";
import moon from "../../assets/icon-moon.svg";

const Header = () => {
  const [theme, setTheme] = useState<string>(() => {
    const defaultTheme = localStorage.getItem("theme") || "light";
    return defaultTheme;
  });

  const handleThemeSwitch = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>TODO</h1>
      <button className={styled.themeSwitcher} onClick={handleThemeSwitch}>
        <img src={theme === "light" ? moon : sun} alt="sun" />
      </button>
    </div>
  );
};

export default Header;
