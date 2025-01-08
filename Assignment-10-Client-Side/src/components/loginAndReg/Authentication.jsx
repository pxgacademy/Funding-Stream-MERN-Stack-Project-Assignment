import { useContext, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const {
    isDark,
    setUser,
    createUser,
    signInUser,
    resetPasswordUser,
    handleGoogleSignInUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [gender, setGender] = useState(null);
  const [isEye, setIsEye] = useState(false);

  const modal = document.getElementById("my_modal_4");

  const closeModal = () => {
    document.getElementById("my_modal_4").close();
    setIsLogin(true);
    navigate("/");
  };

  // signup functionality
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    modal.close();
    setIsEye(false);

    if (!gender) {
      Swal.fire({
        title: "Please select a gender",
        icon: "error",
        customClass: {
          popup: "bg-black/60 backdrop-blur text-white",
        },
      }).then(() => modal.showModal());
      return;
    }

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const dateOfBirth = form.dateOfBirth.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title:
          "Password must contain at least one uppercase, one lowercase, one number, one symbol, and 8 characters long.",
        icon: "error",
        customClass: {
          popup: "bg-black/60 backdrop-blur text-white",
        },
      }).then(() => modal.showModal());
      return;
    }

    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        const creationTime = result?.user?.metadata?.creationTime;
        const user = {
          name,
          photo,
          dateOfBirth,
          gender,
          phone,
          email,
          creationTime,
        };
        fetch("https://assignment-10-backend-nine.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Your Account Successfully Created",
              icon: "success",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
            e.target.reset();
            setIsLogin(true);
          })
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => modal.showModal())
          );
        console.log(result.user);
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
          customClass: {
            popup: "bg-black/60 backdrop-blur text-white",
          },
        }).then(() => modal.showModal())
      );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    modal.close();
    setIsEye(false);

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        setUser(result?.user);
        // update last login time
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const signInInfo = { email, lastSignInTime };

        fetch("https://assignment-10-backend-nine.vercel.app/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInInfo),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Successfully Logged in",
              icon: "success",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
            e.target.reset();
          })
          .catch((err) =>
            Swal.fire({
              title: `Backend error: ${err.message}`,
              icon: "error",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => modal.showModal())
          );
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
          customClass: {
            popup: "bg-black/60 backdrop-blur text-white",
          },
        }).then(() => modal.showModal())
      );
  };

  const handleGoogleSign = () => {
    modal.close();
    setIsEye(false);

    handleGoogleSignInUser()
      .then((result) => {
        setUser(result.user);
        const creationTime = result?.user?.metadata?.creationTime;
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const user = {
          name: "",
          photo: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
          email: result?.user?.email,
          creationTime,
          lastSignInTime,
        };
        fetch(
          `https://assignment-10-backend-nine.vercel.app/goggle-users/${result.user.email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Successfully Logged In",
              icon: "success",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
          })
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => modal.showModal())
          );
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
          customClass: {
            popup: "bg-black/60 backdrop-blur text-white",
          },
        }).then(() => modal.showModal())
      );
  };

  const handleResetPasswordUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    modal.close();

    if (!userEmail) {
      Swal.fire({
        title: "Enter a valid email",
        icon: "error",
        customClass: {
          popup: "bg-black/60 backdrop-blur text-white",
        },
      }).then(() => modal.showModal());
      return;
    }

    Swal.fire({
      title: "Do you want to reset your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resetPasswordUser(userEmail)
          .then(() => {
            Swal.fire({
              title: "Password reset email sent to your email",
              icon: "success",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
          })
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => modal.showModal())
          );
      }
    });
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div
        className={`${
          isDark && "dark"
        } bg-darkTwo modal-box w-11/12 max-w-5xl relative`}
      >
        <div
          className={`absolute z-50 left-1 lg:left-7 lg:top-7 top-0 ${
            isLogin ? "h-full" : "h-[141%]"
          }`}
        >
          <div className="relative h-full">
            <button
              onClick={closeModal}
              className="sticky -top-5 text-2xl md:text-3xl p-1 md:p-2 text-white bg-darkTwo rounded-full border border-info/40"
            >
              <IoClose />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div
            className={`${
              isLogin
                ? "bg-[url(/src/assets/log.webp)]"
                : "bg-[url(/src/assets/reg.jpg)]"
            } h-full w-full bg-no-repeat bg-center bg-cover hidden lg:flex p-5 items-center justify-center rounded-3xl border border-white/40`}
          >
            <div className="p-5 bg-white/70 backdrop-blur-sm">
              <p className="text-base text-darkOne">
                We're thrilled to have you join our community of dreamers,
                creators, and supporters. By registering with Funding Stream,
                you'll gain access to a platform that empowers you to launch
                your innovative projects, gather support from like-minded
                individuals, and make a real impact. Whether you're looking to
                fund a creative endeavor, a groundbreaking invention, or a
                community initiative, Funding Stream is here to help you turn
                your vision into reality. Let's create something amazing
                together! 🌟 Ready to start your journey? Sign up now and become
                part of the Funding Stream family!
              </p>
            </div>
          </div>

          <div>
            <div className="py-1 bg-black/50 backdrop-blur mb-5 rounded-full p-1 grid grid-cols-2 text-white">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`${isLogin ? "bg-error" : ""} rounded-full py-1`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`${!isLogin ? "bg-error" : ""} rounded-full py-1`}
              >
                Register
              </button>
            </div>

            {isLogin ? (
              // signin form
              <div
                className="card card-body bg-black/20 backdrop-blur-sm
border border-white/40 text-white w-full max-w-md shrink-0 shadow-xl mx-auto "
              >
                <div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white/90">
                    Welcome Back!
                  </h2>
                  <p className="text-white/80 mt-2">
                    We're excited to see you again. Log in to continue enjoying
                    our services and stay connected with all the latest updates.
                  </p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="input bg-transparent border-white/40"
                      type="email"
                      placeholder="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <label className="input bg-transparent border-white/40 flex">
                      <input
                        className="grow"
                        type={isEye ? "text" : "password"}
                        placeholder="password"
                        name="password"
                        required
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsEye(!isEye);
                        }}
                      >
                        {isEye ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                  </div>
                  <div>
                    <label className="label">
                      <button
                        onClick={handleResetPasswordUser}
                        className="text-sm duration-300 text-white/80 hover:text-info"
                      >
                        Forgot password?
                      </button>
                    </label>
                  </div>
                  <div className="form-control mt-3">
                    <button className="btn bg-orange-900 border-none text-white hover:bg-orange-950">
                      Login
                    </button>
                  </div>
                </form>

                <div>
                  <button
                    onClick={handleGoogleSign}
                    className="btn btn-ghost w-full border-neutral"
                  >
                    Login With Google <FaGoogle />
                  </button>
                </div>

                <span className="label-text text-white mt-3">
                  {"Don't have an account? "}
                  <span
                    className="cursor-pointer text-info"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setIsEye(false);
                    }}
                  >
                    Register
                  </span>
                </span>
              </div>
            ) : (
              // Signup form
              <div
                className="card card-body bg-black/20 backdrop-blur-sm
      border border-white/40 text-white w-full max-w-md shrink-0 shadow-xl mx-auto"
              >
                <div className="w-full">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white/90">
                    Welcome to <br /> Funding Stream!
                  </h2>
                  <p className="text-white/80 mt-2">
                    Unlock the power of community and turn your dreams into
                    reality. Join now to create and support inspiring projects,
                    and be part of a movement that brings ideas to life! 🌟
                  </p>
                </div>
                <form onSubmit={handleSubmitSignup}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Full Name</span>
                    </label>
                    <input
                      className="input bg-transparent border-white/40"
                      type="text"
                      placeholder="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Photo URL</span>
                    </label>
                    <input
                      className="input bg-transparent border-white/40"
                      type="text"
                      placeholder="photo URL"
                      name="photo"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      className="input bg-transparent border-white/40"
                      type="date"
                      placeholder="Date of Birth"
                      name="dateOfBirth"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Phone</span>
                    </label>
                    <input
                      className="input bg-transparent border-white/40"
                      type="text"
                      placeholder="phone"
                      name="phone"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      className="input bg-transparent border-white/40"
                      type="email"
                      placeholder="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <label className="input bg-transparent border-white/40 flex">
                      <input
                        className="grow"
                        type={isEye ? "text" : "password"}
                        placeholder="password"
                        name="password"
                        required
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsEye(!isEye);
                        }}
                      >
                        {isEye ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                  </div>

                  <label className="inline-block mt-3">
                    <span className="block mb-2">Select your gender</span>
                    <input
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="male"
                      onClick={() => setGender("Male")}
                    />
                    <label className="ml-2 mr-5" htmlFor="genderMale">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="female"
                      onClick={() => setGender("Female")}
                    />
                    <label className="ml-2 mr-5" htmlFor="genderFemale">
                      Female
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="genderOthers"
                      value="others"
                      onClick={() => setGender("Others")}
                    />
                    <label className="ml-2" htmlFor="genderOthers">
                      Others
                    </label>
                  </label>

                  <div className="form-control mt-3">
                    <button className="btn bg-orange-900 border-none text-white hover:bg-orange-950">
                      Register
                    </button>
                  </div>
                </form>

                <span className="label-text text-white mt-3">
                  {"Already have an account? "}
                  <span
                    className="cursor-pointer text-info"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setIsEye(false);
                    }}
                  >
                    Login
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Authentication;
