import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import SingleCampaignCard from "./SingleCampaignCard";

const AllCampaign = () => {
  const { isDark } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState({
    name: "All Campaigns",
    id: "all",
  });
  const campaignCategories = [
    { name: "All Campaigns", id: "all" },
    { name: "Rewards-Based", id: "r1b1" },
    { name: "Equity-Based", id: "e2b2" },
    { name: "Donation-Based", id: "d3b3" },
    { name: "Debt-Based", id: "d4b4" },
  ];

  const handleCloseMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  // Campaign Loader
  useEffect(() => {
    window.scrollTo(0, 0);
    handleCampaignLoading();
  }, [campaignIndex]);

  const handleCampaignLoading = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/campaigns/${campaignIndex.id}`
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

  // handle sort campaign
  const handleSortCampaign = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/sorting-campaigns/${campaignIndex.id}`
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

  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-5 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-7xl mx-auto">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-20 bg-gray-300 dark:bg-neutral py-4 rounded-none w-full text-lg font-semibold"
            >
              Campaign Categories
            </button>

            <div
              className={`${
                isMenuOpen ? "top-[60px] h-auto" : "top-0 md:h-auto h-0"
              }
              w-full absolute z-10 grid grid-cols-2 md:grid-cols-5 py-1 bg-purple-800 px-1 overflow-hidden transition-all duration-500`}
            >
              {campaignCategories.map((category, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCampaignIndex({
                      name: category.name,
                      id: category.id,
                    });
                    handleCloseMenu();
                  }}
                  className={`${
                    campaignIndex.id === category.id ? "btn btn-error" : ""
                  } ${
                    category.id === "all" ? "col-span-2 md:col-span-1" : ""
                  } py-3 text-white`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 py-4 px-4 bg-gray-300 dark:bg-neutral flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{campaignIndex.name}</h2>

            <button className="btn text-white" onClick={handleSortCampaign}>
              Sort by Goal
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {campaigns.map((campaign) => (
              <SingleCampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        </section>
      </section>
    </section>
  );
};

export default AllCampaign;
