import { useContext } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { isDark, userInfo } = useContext(AuthContext);

  console.log(userInfo);

  const { _id, name, photo, dateOfBirth, gender, phone, email } =
    userInfo || {};

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const dateOfBirth = form.dateOfBirth.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const data = { name, photo, dateOfBirth, phone, email };

    Swal.fire({
      title: "Do you want to update the profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed)
        fetch(
          `https://assignment-10-backend-nine.vercel.app/update-profile/${_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Successfully Updated!",
              icon: "success",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
            event.target.reset();
          })
          .catch((err) =>
            Swal.fire({
              title: `Backend error: ${err.message}`,
              icon: "error",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            })
          );
    });
  };

  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-10 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            <div className="border border-black/20 dark:border-white/20 p-4">
              <h2 className="text-xl font-semibold mb-7 text-info">
                YOUR PROFILE INFO
              </h2>
              <img
                className="w-full max-w-64 object-cover"
                src={photo}
                alt=""
              />
              <h3 className="text-2xl">
                <span className="font-semibold">Name:</span> {name}
              </h3>
              <p className="text-lg">
                <span className="font-semibold">Date of Birth: </span>
                {dateOfBirth}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Gender: </span> {gender}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email: </span> {email}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone: </span> {phone}
              </p>
            </div>

            <div className="border border-black/20 dark:border-white/20 p-4">
              <h2 className="text-xl font-semibold mb-7 text-info">
                UPDATE PROFILE INFO
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-3">
                <label className="block">
                  <label className="block mb-2">Full Name</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="name"
                    defaultValue={name}
                    placeholder="Full Name"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Photo URL</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="photo"
                    defaultValue={photo}
                    placeholder="Photo URL"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Date of Birth</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="date"
                    name="dateOfBirth"
                    defaultValue={dateOfBirth}
                    placeholder="Date of Birth"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Email</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="email"
                    name="email"
                    disabled
                    defaultValue={email}
                    placeholder="Email"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Phone</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="phone"
                    defaultValue={phone}
                    placeholder="Phone"
                  />
                </label>

                <button className="block w-full bg-info hover:bg-info/50 text-white font-bold py-3 px-6 rounded-lg">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default MyProfile;
