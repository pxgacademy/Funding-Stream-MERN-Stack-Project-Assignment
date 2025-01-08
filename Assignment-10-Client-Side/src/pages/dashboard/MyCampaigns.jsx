import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import MyCampaignCard from "./MyCampaignCard";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);

  // Campaign Loader
  useEffect(() => {
    window.scrollTo(0, 0);
    handleCampaignLoading();
  }, [user]);

  const handleCampaignLoading = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/my-campaigns/${user?.email}`
      )
      .then((response) => {
        setCampaigns(response.data);
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

  // delete campaign

  const handleDeleteCampaign = (id) => {
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
          `https://assignment-10-backend-nine.vercel.app/delete-campaign/${id}`,
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
            handleCampaignLoading();
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
      {campaigns.length === 0 && (
        <div className="mt-7 w-full text-center text-3xl font-semibold flex items-center justify-center min-h-32">
          <p>No Campaigns Found!</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
        {campaigns.map((campaign) => (
          <MyCampaignCard
            key={campaign._id}
            campaign={campaign}
            handleDeleteCampaign={handleDeleteCampaign}
          />
        ))}
      </div>
    </>
  );
};

export default MyCampaigns;
