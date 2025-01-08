import { useContext } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import Navbar from "./Navbar";

const Header = () => {
  const { isDark } = useContext(AuthContext);
  return (
    <header className={`${isDark && "dark"}`}>
      <section className="bg-lightTwo dark:bg-darkThree px-5">
        <Navbar />
      </section>
    </header>
  );
};

export default Header;
