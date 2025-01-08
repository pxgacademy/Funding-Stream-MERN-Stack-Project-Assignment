import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateCampaign = () => {
  const { isDark, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});

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
    if (campaign.creatorEmail) {
      if (campaign.creatorEmail !== user.email) {
        navigate("/dashboard");
        Swal.fire({
          title: "Unauthorized",
          text: "You are not authorized to update this campaign.",
          icon: "error",
          customClass: {
            popup: "bg-black/60 backdrop-blur text-white",
          },
        });
      }
    }
  }, [campaign]);

  // ==============================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const campaignTitle = campaign.campaignTitle;
    const campaignName = form.campaign_name.value;
    const campaignGoal = form.campaign_goal.value;
    const campaignCategory = form.campaign_category.value;
    const campaignStartDate = form.campaign_start_date.value;
    const campaignEndDate = form.campaign_end_date.value;
    const campaignDescription = form.campaign_description.value;

    // creator information
    const creatorName = form.creator_name.value;
    const creatorEmail = form.creator_email.value;
    const creatorPhone = form.creator_phone.value;
    const creatorCompany = form.creator_company.value;
    const creatorWebsite = form.creator_website.value;

    // creator address
    const creatorStreetAddress = form.creator_street_address.value;
    const creatorCity = form.creator_city.value;
    const creatorState = form.creator_state.value;
    const creatorZipCode = form.creator_zip_code.value;
    const creatorCountry = form.creator_country.value;
    const creatorAdditionalNotes = form.creator_additional_notes.value;

    // Media and Assets
    const campaignCoverImage = form.campaign_cover_image.value;
    const campaignAdditionalImage1 = form.campaign_additional_image_1.value;
    const campaignAdditionalImage2 = form.campaign_additional_image_2.value;
    const campaignAdditionalImage3 = form.campaign_additional_image_3.value;
    const campaignVideo = form.campaign_video.value;

    const allInfo = {
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
      creatorWebsite,
      creatorStreetAddress,
      creatorCity,
      creatorState,
      creatorZipCode,
      creatorCountry,
      creatorAdditionalNotes,
      campaignCoverImage,
      campaignAdditionalImage1,
      campaignAdditionalImage2,
      campaignAdditionalImage3,
      campaignVideo,
    };

    // Rewards-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "r1b1") {
      const rewardTierName = form.reward_tier_name.value;
      const rewardContributionAmount = form.reward_contribution_amount.value;
      const rewardEstimatedDate = form.reward_estimated_date.value;
      const rewardDescription = form.reward_description.value;
      const rewardShipped = form.reward_shipped.value;
      const rewardRegionsCovered = form.reward_regions_covered.value;
      const data = {
        ...allInfo,
        rewardTierName,
        rewardContributionAmount,
        rewardEstimatedDate,
        rewardDescription,
        rewardShipped,
        rewardRegionsCovered,
      };
      handleRewardsBased(event, data);
    }

    // Equity-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "e2b2") {
      const equityBusinessRegNo = form.equity_business_reg_no.value;
      const equityRevenueProjections = form.equity_revenue_projections.value;
      const equityCurrentValuation = form.equity_current_valuation.value;
      const equityBusinessPlanSummary = form.equity_business_plan_summary.value;
      const equityPercentageOffered = form.equity_percentage_offered.value;
      const equityInvestmentAmount = form.equity_investment_amount.value;
      const equityInvestorBenefits = form.equity_investor_benefits.value;
      const equityComplianceDoc = form.equity_compliance_doc.value;
      const data = {
        ...allInfo,
        equityBusinessRegNo,
        equityRevenueProjections,
        equityCurrentValuation,
        equityBusinessPlanSummary,
        equityPercentageOffered,
        equityInvestmentAmount,
        equityInvestorBenefits,
        equityComplianceDoc,
      };
      handleEquityBased(event, data);
    }

    // Donation-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "d3b3") {
      const donationFundHelper = form.donation_fund_helper.value;
      const donationSupportPhoto = form.donation_support_photo.value;
      const donationSupportVideo = form.donation_support_video.value;
      const donationStories = form.donation_stories.value;
      const donationFundsBeUsed = form.donation_funds_be_used.value;
      const donationCampaignUpdates = form.donation_campaign_updates.value;
      const data = {
        ...allInfo,
        donationFundHelper,
        donationSupportPhoto,
        donationSupportVideo,
        donationStories,
        donationFundsBeUsed,
        donationCampaignUpdates,
      };
      handleDonationBased(event, data);
    }

    // Debt-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "d4b4") {
      const debtLoanAmount = form.debt_loan_amount.value;
      const debtRepaymentPeriod = form.debt_repayment_period.value;
      const debtInterestRateOffered = form.debt_interest_rate_offered.value;
      const debtCreditScoreFinancialHistory =
        form.debt_credit_score_financial_history.value;
      const debtIncomeProof = form.debt_income_proof.value;
      const debtBorrowedFundsUsedFor = form.debt_borrowed_funds_used_for.value;
      const data = {
        ...allInfo,
        debtLoanAmount,
        debtRepaymentPeriod,
        debtInterestRateOffered,
        debtCreditScoreFinancialHistory,
        debtIncomeProof,
        debtBorrowedFundsUsedFor,
      };
      handleDebtBased(event, data);
    }
  };

  // Rewards-Based Crowdfunding Information
  const handleRewardsBased = (event, data) => {
    Swal.fire({
      title: "Do you want to update the campaign?",
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
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/campaign-update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then(() => {
            Swal.fire({
              title: "Successfully Updated the Campaign!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => {
              navigate(`/campaign-details/${id}`);
              event.target.reset();
            });
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

  const handleEquityBased = (event, data) => {
    Swal.fire({
      title: "Do you want to update the campaign?",
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
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/campaign-update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then(() => {
            Swal.fire({
              title: "Successfully Updated the Campaign!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => {
              navigate(`/campaign-details/${id}`);
              event.target.reset();
            });
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

  const handleDonationBased = (event, data) => {
    Swal.fire({
      title: "Do you want to update the campaign?",
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
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/campaign-update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then(() => {
            Swal.fire({
              title: "Successfully Updated the Campaign!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => {
              navigate(`/campaign-details/${id}`);
              event.target.reset();
            });
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

  const handleDebtBased = (event, data) => {
    Swal.fire({
      title: "Do you want to update the campaign?",
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
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/campaign-update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
          .then(() => {
            Swal.fire({
              title: "Successfully Updated the Campaign!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            }).then(() => {
              navigate(`/campaign-details/${id}`);
              event.target.reset();
            });
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

  const campaignTitle = `${campaign.campaignTitle} Campaign`;

  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pt-10 pb-24 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl md:text-5xl font-bold">
            Update your campaign: <br />{" "}
            <span className="text-primary font-aclonica inline-block mt-6">
              {campaignTitle}
            </span>
          </h2>

          <div className="mt-10 border border-darkThree/40 dark:border-lightTwo/40 p-5 lg:p-10 rounded-lg">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* General Information */}
              <h3 className="text-xl font-semibold text-info mb-3">
                General Information:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">Campaign Title</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign-title"
                    value={campaignTitle}
                    disabled
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Campaign Name</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_name"
                    required
                    defaultValue={campaign?.campaignName}
                    placeholder="A catchy name for the campaign"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Campaign Goal</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_goal"
                    required
                    defaultValue={campaign?.campaignGoal}
                    placeholder="The target amount you want to raise"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Campaign Category</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_category"
                    required
                    defaultValue={campaign?.campaignCategory}
                    placeholder="The category (e.g., technology, arts, health, etc...)"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Campaign Start Date</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="date"
                    name="campaign_start_date"
                    required
                    defaultValue={campaign?.campaignStartDate}
                    placeholder="The date you want to start from"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Campaign End Date</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="date"
                    name="campaign_end_date"
                    required
                    defaultValue={campaign?.campaignEndDate}
                    placeholder="The date you want to end"
                  />
                </label>

                <label className="block md:col-span-2">
                  <label className="block mb-2">Campaign Description</label>
                  <textarea
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full min-h-32"
                    type="text"
                    name="campaign_description"
                    required
                    defaultValue={campaign?.campaignDescription}
                    placeholder="A detailed explanation of the campaign's purpose"
                  ></textarea>
                </label>
              </div>

              {/* Creator Information */}
              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Campaign Creator Information:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">Your Full Name</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_name"
                    disabled
                    value={campaign?.creatorName}
                    placeholder="Full name"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Your Email Address</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="email"
                    name="creator_email"
                    value={campaign.creatorEmail}
                    disabled
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Your Phone Number</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_phone"
                    required
                    defaultValue={campaign?.creatorPhone}
                    placeholder="Phone number"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Organization/Company Name (Optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_company"
                    defaultValue={campaign?.creatorCompany}
                    placeholder="Organization/Company Name"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Website Link (Optional)</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_website"
                    defaultValue={campaign?.creatorWebsite}
                    placeholder="Website Link"
                  />
                </label>
              </div>

              {/* Creator Address */}
              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Campaign Creator Address:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">Street Address</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_street_address"
                    required
                    defaultValue={campaign?.creatorStreetAddress}
                    placeholder="Street Address"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">City</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_city"
                    required
                    defaultValue={campaign?.creatorCity}
                    placeholder="City"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">State/Province/Region</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_state"
                    required
                    defaultValue={campaign?.creatorState}
                    placeholder="State/Province/Region"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Postal/ZIP Code</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_zip_code"
                    required
                    defaultValue={campaign?.creatorZipCode}
                    placeholder="Postal/ZIP Code"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Country</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_country"
                    required
                    defaultValue={campaign?.creatorCountry}
                    placeholder="Country"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Additional Notes (optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="creator_additional_notes"
                    defaultValue={campaign?.creatorAdditionalNotes}
                    placeholder="Apartment number or special instructions"
                  />
                </label>
              </div>

              {/* Rewards-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "r1b1" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Rewards Details:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">Tier Names</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_tier_name"
                        required
                        defaultValue={campaign?.rewardTierName}
                        placeholder="Tier names (e.g., Bronze Supporter, Gold Sponsor)"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Contribution Amounts</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_contribution_amount"
                        required
                        defaultValue={campaign?.rewardContributionAmount}
                        placeholder="Contribution amounts for each reward"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Estimated Delivery Dates
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="date"
                        name="reward_estimated_date"
                        required
                        defaultValue={campaign?.rewardEstimatedDate}
                        placeholder="Estimated delivery dates for rewards"
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <label className="block mb-2">
                        Description of Rewards
                      </label>
                      <textarea
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full min-h-32"
                        type="text"
                        name="reward_description"
                        required
                        defaultValue={campaign?.rewardDescription}
                        placeholder="Description of Rewards"
                      ></textarea>
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Shipping Information:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Will rewards be shipped?
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_shipped"
                        required
                        defaultValue={campaign?.rewardShipped}
                        placeholder="Will rewards be shipped? Write in detail."
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Regions covered</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_regions_covered"
                        required
                        defaultValue={campaign?.rewardRegionsCovered}
                        placeholder="(local/international)"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Equity-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "e2b2" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Business Information:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Business Registration Number
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_business_reg_no"
                        required
                        defaultValue={campaign?.equityBusinessRegNo}
                        placeholder="Business Registration Number"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Revenue/Profit Projections
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_revenue_projections"
                        required
                        defaultValue={campaign?.equityRevenueProjections}
                        placeholder="Revenue/Profit Projections"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Current Valuation</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_current_valuation"
                        required
                        defaultValue={campaign?.equityCurrentValuation}
                        placeholder="Current Valuation"
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <label className="block mb-2">
                        Business Plan Summary
                      </label>
                      <textarea
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full min-h-32"
                        type="text"
                        name="equity_business_plan_summary"
                        required
                        defaultValue={campaign?.equityBusinessPlanSummary}
                        placeholder="Write a business plan summary based on your project"
                      ></textarea>
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Equity Offering:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Percentage of Equity Being Offered
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_percentage_offered"
                        required
                        defaultValue={campaign?.equityPercentageOffered}
                        placeholder="Percentage of equity being offered"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Minimum Investment Amount
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_investment_amount"
                        required
                        defaultValue={campaign?.equityInvestmentAmount}
                        placeholder="Percentage of equity being offered"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Investor Benefits</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_investor_benefits"
                        required
                        defaultValue={campaign?.equityInvestorBenefits}
                        placeholder="Investor benefits"
                      />
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Regulatory Compliance:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Details of Compliance Documentation (optional)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_compliance_doc"
                        defaultValue={campaign?.equityComplianceDoc}
                        placeholder="Details of compliance documentation (optional)"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Donation-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "d3b3" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Beneficiary Details:
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Who or What Will the Funds Help
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="donation_fund_helper"
                        required
                        defaultValue={campaign?.donationFundHelper}
                        placeholder="(e.g., a person, a community, or an organization)"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Photos or Videos to Support the Campaign
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="donation_support_photo"
                        required
                        defaultValue={campaign?.donationSupportPhoto}
                        placeholder="Photo Url (in should ba an album)"
                      />
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 mt-3 rounded w-full"
                        type="text"
                        name="donation_support_video"
                        defaultValue={campaign?.donationSupportVideo}
                        placeholder="Video Url (optional)"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Stories or Case Studies
                      </label>
                      <textarea
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full min-h-32"
                        type="text"
                        name="donation_stories"
                        required
                        defaultValue={campaign?.donationStories}
                        placeholder="Write stories or case studies in detail"
                      ></textarea>
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Transparency Plan:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        How will the Funds be Used?
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="donation_funds_be_used"
                        required
                        defaultValue={campaign?.donationFundsBeUsed}
                        placeholder="How will the funds be used? Write in detail."
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Post-Campaign Updates
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="donation_campaign_updates"
                        defaultValue={campaign?.donationCampaignUpdates}
                        placeholder="(e.g., milestones, receipts)"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Debt-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "d4b4" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Loan Details:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">Loan Amount</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_loan_amount"
                        required
                        defaultValue={campaign?.debtLoanAmount}
                        placeholder="Loan amount"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Repayment Period</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="date"
                        name="debt_repayment_period"
                        required
                        defaultValue={campaign?.debtRepaymentPeriod}
                        placeholder="Repayment period"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Interest Rate Offered
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_interest_rate_offered"
                        required
                        defaultValue={campaign?.debtInterestRateOffered}
                        placeholder="Interest rate offered (%)"
                      />
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Creditworthiness Information:
                  </h3>
                  <div className="grid gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Credit Score or Financial History
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_credit_score_financial_history"
                        required
                        defaultValue={campaign?.debtCreditScoreFinancialHistory}
                        placeholder="Credit score or financial history"
                      />
                    </label>
                    <label className="block">
                      <label className="block mb-2">
                        Proof of Income or Business Revenue
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_income_proof"
                        required
                        defaultValue={campaign?.debtIncomeProof}
                        placeholder="Proof of income or business revenue"
                      />
                    </label>
                  </div>

                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    Loan Purpose:
                  </h3>
                  <div className="grid gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        What the Borrowed Funds will be Used for.
                      </label>
                      <textarea
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full min-h-32"
                        type="text"
                        name="debt_borrowed_funds_used_for"
                        required
                        defaultValue={campaign?.debtBorrowedFundsUsedFor}
                        placeholder="Explain what the borrowed funds will be used for"
                      ></textarea>
                    </label>
                  </div>
                </>
              )}

              {/* Media and Assets */}
              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Media and Assets:
              </h3>
              <div className="grid gap-3">
                <label className="block">
                  <label className="block mb-2">Campaign Cover Image</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_cover_image"
                    required
                    defaultValue={campaign?.campaignCoverImage}
                    placeholder="(Link) A high-quality image to represent the campaign"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Additional Image (Optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_additional_image_1"
                    defaultValue={campaign?.campaignAdditionalImage1}
                    placeholder="(Link) Additional Image"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Additional Image (Optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_additional_image_2"
                    defaultValue={campaign?.campaignAdditionalImage2}
                    placeholder="(Link) Additional Image"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Additional Image (Optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_additional_image_3"
                    defaultValue={campaign?.campaignAdditionalImage3}
                    placeholder="(Link) Additional Image"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Campaign Video (Optional)
                  </label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="campaign_video"
                    defaultValue={campaign?.campaignVideo}
                    placeholder="(Link) Campaign video"
                  />
                </label>
              </div>

              {/* submit */}
              <input
                type="submit"
                value="Update Campaign"
                className="btn btn-warning w-full mt-7 text-darkOne font-semibold text-lg"
              />
            </form>
          </div>
        </section>
      </section>
    </section>
  );
};

export default UpdateCampaign;
