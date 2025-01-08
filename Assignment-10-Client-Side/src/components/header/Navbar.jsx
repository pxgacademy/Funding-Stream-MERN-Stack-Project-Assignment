import { useContext, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../utilities/AuthProvider";
import Authentication from "../loginAndReg/Authentication";
import Swal from "sweetalert2";
import NewCampaignModal from "../../pages/newCampaign/NewCampaignModal";
import { Tooltip } from "react-tooltip";

//

//

const Navbar = () => {
  const { isDark, user, userInfo, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setIsOpenUser(false);
    signOutUser().then(() =>
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
        confirmButtonText: "Okay!",
        customClass: {
          popup: "bg-black/60 backdrop-blur text-white",
        },
      })
    );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Coming Soon",
      text: "This feature is currently under development.",
      icon: "info",
      confirmButtonText: "Okay!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    });
  };

  // ----------------------------------------------------------------

  // nav links
  const links = (
    <>
      <NavLink onClick={closeMobileMenu} to="/">
        Home
      </NavLink>
      <NavLink onClick={closeMobileMenu} to="/campaigns">
        Campaigns
      </NavLink>
      <NavLink onClick={closeMobileMenu} to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );

  // Search input
  const searchInput = (
    <div>
      <form
        onSubmit={handleSearchSubmit}
        className="border border-darkThree/20 dark:border-lightTwo/20 flex overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-darkTwo dark:text-lightTwo py-1 px-3 text-lg grow border-none outline-none"
        />
        <button className="text-darkTwo dark:text-lightTwo text-lg bg-darkThree/10 dark:bg-lightTwo/10 px-4">
          <FaSearch />
        </button>
      </form>
    </div>
  );

  // Start Campaign
  const startCampaign = (
    <button
      onClick={() => {
        closeMobileMenu();
        document.getElementById("my_modal_3").showModal();
      }}
      className="border w-full md:w-auto border-error hover:bg-error hover:text-white text-darkOne dark:text-white duration-300 px-3 py-2 h-10"
    >
      Start a Campaign
    </button>
  );

  return (
    <nav className={`${isDark && "dark"} max-w-7xl mx-auto`}>
      <div
        className={`max-w-7xl py-3 mx-auto flex items-center justify-between`}
      >
        <div className="flex items-center gap-2 text-darkTwo dark:text-lightTwo">
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl lg:hidden"
          >
            <HiMenuAlt1 />
          </button>
          <h3 className="text-2xl font-aclonica">Funding Stream</h3>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-darkTwo dark:text-lightTwo *:px-3 *:py-1 *:transition-all *:duration-300">
          {links}
        </div>

        {/* Search input */}
        <div className="hidden lg:block">{searchInput}</div>

        <div className="flex items-center gap-3 ">
          <div className="hidden md:block">{startCampaign}</div>

          {/* user profile or login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpenUser(!isOpenUser)}
                data-tooltip-id="my-tooltip"
                className="bg-info text-white w-10 h-10 flex items-center justify-center"
              >
                {userInfo?.photo ? (
                  <img
                    className="w-full h-full object-cover"
                    src={userInfo.photo}
                  />
                ) : (
                  <FaUser />
                )}
                <Tooltip style={{ backgroundColor: "#019201", color: "#fff", fontSize: '18px' }} id="my-tooltip" content={user?.email} />
              </button>

              <div
                className={`${isOpenUser ? "py-7" : "h-0"} z-50
                absolute right-0 top-12 min-w-80 bg-info/50 backdrop-blur px-5 rounded overflow-hidden transition-all duration-100`}
              >
                <div className="space-y-2 text-left text-white">
                  <Link to='/my-profile'>
                  <button className="bg-black/15 hover:bg-black/25 py-1 px-5 text-left rounded-none w-full">
                    My Profile
                  </button></Link>
                  <button
                    onClick={handleSignOut}
                    className="bg-black/15 hover:bg-black/25 py-1 px-5 text-left rounded-none w-full"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-h-10 flex items-center justify-center overflow-hidden">
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="bg-neutral hover:bg-neutral-700 text-lightTwo p-3"
              >
                Login
              </button>
            </div>
          )}
        </div>

        <Authentication />

        {/* Mobile Navbar */}
        <div
          className={`absolute z-50 px-5 py-10 min-w-60 min-h-screen transition-all duration-500 bg-white/80 dark:bg-darkTwo/80 backdrop-blur  ${
            isOpen ? "top-0 left-0" : "top-0 -left-[110%]"
          }`}
        >
          <div className="w-full relative h-0">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -right-3 -top-8 bg-neutral p-1 text-lg text-white rounded-full"
            >
              <IoClose />
            </button>
          </div>
          <h3 className="text-2xl font-aclonica mt-5 text-darkTwo dark:text-lightTwo ">
            Funding Stream
          </h3>

          <div className="mt-5">{searchInput}</div>

          <div className="mt-5 border border-darkThree/20 dark:border-lightTwo/20 text-darkTwo dark:text-lightTwo p-4 flex flex-col gap-1  *:py-1 *:px-3">
            {links}
          </div>

          <div className="mt-5  md:hidden">{startCampaign}</div>
        </div>

        {/*  */}
      </div>
      <NewCampaignModal />
    </nav>
  );
};

export default Navbar;
