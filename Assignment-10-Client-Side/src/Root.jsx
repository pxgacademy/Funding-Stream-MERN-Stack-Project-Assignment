import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "./utilities/AuthProvider";
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const Root = () => {
  const { isDark, setIsDark } = useContext(AuthContext);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("isDark"));
    if (theme !== null) {
      setIsDark(theme);
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("isDark", JSON.stringify(newTheme));
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      <div
        className={`${
          isDark && "dark"
        } class fixed z-50 right-5 bottom-5 h-11 w-11 flex items-center justify-center overflow-hidden`}
      >
        <button
          onClick={handleThemeChange}
          className="bg-darkThree/70 dark:bg-white/70 backdrop-blur text-lightTwo  dark:text-darkTwo p-5 text-2xl"
        >
          {isDark ? <MdLightMode /> : <FaMoon />}
        </button>
      </div>
    </>
  );
};

export default Root;
