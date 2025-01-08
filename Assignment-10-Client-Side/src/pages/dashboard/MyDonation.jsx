import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import MyDonationCard from "./MyDonationCard";

const MyDonation = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  // Campaign Loader
  useEffect(() => {
    window.scrollTo(0, 0);
    handleDonationLoading();
  }, [user]);

  const handleDonationLoading = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/my-donations/${user?.email}`
      )
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "error",
          customClass: {
            popup: "bg-black/60 backdrop-blur text-white",
          },
        });
      });
  };

  // delete donation

  const handleDeleteDonation = (id) => {
    Swal.fire({
      title: "Do you want to Delete the campaign?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/delete-donation/${id}`,
          { method: "DELETE" }
        )
          .then(() => {
            Swal.fire({
              title: "Successfully Deleted the Campaign!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
            handleDonationLoading();
          })
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            })
          );
      }
    });
  };

  return (
    <>
      {donations.length === 0 && (
        <div className="mt-7 w-full text-center text-3xl font-semibold flex items-center justify-center min-h-32">
          <p>No Donation Found!</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
        {donations.map((donation) => (
          <MyDonationCard
            key={donation._id}
            donation={donation}
            handleDeleteDonation={handleDeleteDonation}
          />
        ))}
      </div>
    </>
  );
};

export default MyDonation;
