import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const CampaignDetails = () => {
  const { isDark, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});
  const [campaignUser, setCampaignUser] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    handleCampaignLoading();
  }, [id]);

  const handleCampaignLoading = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/campaign-details/${id}`
      )
      .then((response) => {
        setCampaign(response.data);
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

  useEffect(() => {
    fetch(
      `https://assignment-10-backend-nine.vercel.app/users/${campaign.creatorEmail}`
    )
      .then((response) => response.json())
      .then((data) => setCampaignUser(data))
      .catch((error) => console.log(`Error: ${error}`));
  }, [campaign]);

  // delete campaign

  const handleDeleteCampaign = () => {
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
          `https://assignment-10-backend-nine.vercel.app/delete-campaign/${campaign._id}`,
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
            navigate("/dashboard");
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

  const {
    _id,
    campaignCategoryId,
    campaignTitle,
    campaignName,
    campaignGoal,
    campaignCategory,
    campaignStartDate,
    campaignEndDate,
    campaignDescription,
    creatorName,
    creatorEmail,
    creatorPhone,
    creatorCompany,
    creatorCity,
    creatorCountry,
    campaignCoverImage,
    campaignAdditionalImage1,
    campaignAdditionalImage2,
    campaignAdditionalImage3,
    campaignVideo,

    rewardTierName,
    rewardContributionAmount,
    rewardEstimatedDate,
    rewardDescription,
    rewardShipped,
    rewardRegionsCovered,

    equityBusinessRegNo,
    equityRevenueProjections,
    equityCurrentValuation,
    equityBusinessPlanSummary,
    equityPercentageOffered,
    equityInvestmentAmount,
    equityInvestorBenefits,

    donationFundHelper,
    donationStories,
    donationFundsBeUsed,
    donationCampaignUpdates,

    debtLoanAmount,
    debtRepaymentPeriod,
    debtInterestRateOffered,
    debtBorrowedFundsUsedFor,

    backers,
  } = campaign || {};

  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-10 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-4xl mx-auto border border-black/15 dark:border-white/20 p-3 lg:p-5 rounded-xl">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center font-aclonica text-error">
            {campaignTitle} Campaign
          </h3>
          <img
            className="w-full rounded-xl mt-5"
            src={campaignCoverImage}
            alt=""
          />
          <h2 className="text-2xl md:text-4xl font-semibold mt-3">
            {campaignName}
          </h2>
          <p className="text-black/70 dark:text-white/80 mt-3">
            {campaignDescription}
          </p>
          <p className="text-lg font-semibold mt-2">
            <span className="text-3xl font-bold">${campaignGoal}</span> USD by{" "}
            {backers ? backers : 0} Backers
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-7">
            <div className="text-lg flex flex-col justify-center">
              <p>
                <span className="font-semibold">Campaign Category: </span>{" "}
                {campaignCategory}
              </p>
              <p>
                <span className="font-semibold">Campaign Start Date: </span>{" "}
                {campaignStartDate}
              </p>
              <p>
                <span className="font-semibold">Campaign End Date:</span>{" "}
                {campaignEndDate}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-28 h-32 rounded-xl overflow-hidden border border-info p-1">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={campaignUser?.photo}
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{creatorName}</h3>
                <div className="text-sm md:text-base text-black/70 dark:text-white/80">
                  <p>{creatorCompany}</p>
                  <p>{creatorEmail}</p>
                  <p>{creatorPhone}</p>
                  <p>
                    {creatorCity}, {creatorCountry}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {campaignVideo && (
            <div className="mt-7">
              <video width="100%" controls>
                <source src={campaignVideo} type="video/mp4" />
              </video>
            </div>
          )}

          {campaignAdditionalImage1 ||
          campaignAdditionalImage2 ||
          campaignAdditionalImage3 ? (
            <div className="flex flex-col justify-between md:flex-row md:max-h-96 rounded-lg overflow-hidden mt-7">
              {campaignAdditionalImage1 && (
                <div className="w-full md:w-[32%] ">
                  <img
                    className="w-full h-full object-cover"
                    src={campaignAdditionalImage1}
                    alt=""
                  />
                </div>
              )}
              <div className="w-full md:w-[32%] mt-4 md:mt-0">
                {campaignAdditionalImage2 && (
                  <img
                    className="w-full h-full object-cover"
                    src={campaignAdditionalImage2}
                    alt=""
                  />
                )}
              </div>
              <div className="w-full md:w-[32%] mt-4 md:mt-0">
                {campaignAdditionalImage3 && (
                  <img
                    className="w-full h-full object-cover"
                    src={campaignAdditionalImage3}
                    alt=""
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {campaignCategoryId === "r1b1" && (
            <div className="mt-7 grid md:grid-cols-2 gap-4">
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Rewards Details:</p>
                <p>
                  <span className="font-semibold">Tier Name: </span>{" "}
                  {rewardTierName}
                </p>
                <p>
                  <span className="font-semibold">Contribution Amount: </span> $
                  {rewardContributionAmount}
                </p>
                <p>
                  <span className="font-semibold">
                    Estimated Delivery Dates:{" "}
                  </span>{" "}
                  {rewardEstimatedDate}
                </p>
                <p>
                  <span className="font-semibold">
                    Description of Rewards:{" "}
                  </span>{" "}
                  {rewardDescription}
                </p>
              </div>
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Shipping Information:</p>
                <p>
                  <span className="font-semibold">
                    Will rewards be shipped?:{" "}
                  </span>
                  {rewardShipped}
                </p>
                <p>
                  <span className="font-semibold">Regions covered: </span>
                  {rewardRegionsCovered}
                </p>
              </div>
            </div>
          )}

          {campaignCategoryId === "e2b2" && (
            <div className="mt-7 grid md:grid-cols-2 gap-4">
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Business Information:</p>
                <p>
                  <span className="font-semibold">
                    Business Registration Number:{" "}
                  </span>
                  {equityBusinessRegNo}
                </p>
                <p>
                  <span className="font-semibold">
                    Revenue/Profit Projections:{" "}
                  </span>
                  {equityRevenueProjections}
                </p>
                <p>
                  <span className="font-semibold">Current Valuation: </span>
                  {equityCurrentValuation}
                </p>
                <p>
                  <span className="font-semibold">Business Plan Summary: </span>
                  {equityBusinessPlanSummary}
                </p>
              </div>
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Equity Offering:</p>
                <p>
                  <span className="font-semibold">
                    Percentage of Equity Being Offered:{" "}
                  </span>
                  {equityPercentageOffered}
                </p>
                <p>
                  <span className="font-semibold">
                    Minimum Investment Amount:{" "}
                  </span>
                  {equityInvestmentAmount}
                </p>
                <p>
                  <span className="font-semibold">Investor Benefits: </span>
                  {equityInvestorBenefits}
                </p>
              </div>
            </div>
          )}

          {campaignCategoryId === "d3b3" && (
            <div className="mt-7 grid md:grid-cols-2 gap-4">
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Beneficiary Details:</p>
                <p>
                  <span className="font-semibold">
                    Who or What Will the Funds Help:{" "}
                  </span>
                  {donationFundHelper}
                </p>
                <p>
                  <span className="font-semibold">
                    Stories or Case Studies:{" "}
                  </span>
                  {donationStories}
                </p>
              </div>
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Transparency Plan:</p>
                <p>
                  <span className="font-semibold">
                    How will the Funds be Used?:{" "}
                  </span>
                  {donationFundsBeUsed}
                </p>
                <p>
                  <span className="font-semibold">Post-Campaign Updates: </span>
                  {donationCampaignUpdates}
                </p>
              </div>
            </div>
          )}

          {campaignCategoryId === "d4b4" && (
            <div className="mt-7 grid md:grid-cols-2 gap-4">
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Loan Details:</p>
                <p>
                  <span className="font-semibold">Loan Amount: </span>$
                  {debtLoanAmount}
                </p>
                <p>
                  <span className="font-semibold">Repayment Period: </span>
                  {debtRepaymentPeriod}
                </p>
                <p>
                  <span className="font-semibold">Interest Rate Offered: </span>
                  {debtInterestRateOffered}%
                </p>
              </div>
              <div className="border border-black/15 dark:border-white/20 rounded p-2">
                <p className="text-lg text-info mb-2">Loan Purpose:</p>
                <p>
                  <span className="font-semibold">
                    What the Borrowed Funds will be Used for:{" "}
                  </span>
                  {debtBorrowedFundsUsedFor}
                </p>
              </div>
            </div>
          )}

          <div className="mt-7 grid grid-cols-2 gap-2">
            {user.email === campaign.creatorEmail ? (
              <>
                <Link to={`/update-campaign/${_id}`}>
                  <button className="rounded-full w-full py-2 text-white bg-error">
                    Update Campaign
                  </button>
                </Link>

                <button
                  onClick={handleDeleteCampaign}
                  className="rounded-full w-full py-2 border border-error"
                >
                  Delete Campaign
                </button>
              </>
            ) : (
              <Link className="w-full col-span-2" to={`/pick-your-perk/${_id}`}>
                <button className="rounded-full w-full py-2 text-white bg-error">
                  PICK YOUR PERK
                </button>
              </Link>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default CampaignDetails;
