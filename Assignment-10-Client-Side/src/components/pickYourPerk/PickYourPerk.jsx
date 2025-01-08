import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PickYourPerk = () => {
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

  // =====================================
  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const campaignId = campaign._id;

    // client information
    const clientName = form.client_name.value;
    const clientEmail = form.client_email.value;
    const clientPhone = form.client_phone.value;
    const clientCompany = form.client_company.value;
    const clientWebsite = form.client_website.value;

    // creator address
    const clientStreetAddress = form.client_street_address.value;
    const clientCity = form.client_city.value;
    const clientState = form.client_state.value;
    const clientZipCode = form.client_zip_code.value;
    const clientCountry = form.client_country.value;
    const clientAdditionalNotes = form.client_additional_notes.value;

    // Legal Agreements
    const authorityTermsAndConditions =
      form.authority_services_terms_conditions.checked;
    const truthfulInformation = form.truthful_information.checked;

    if (!authorityTermsAndConditions || !truthfulInformation) {
      Swal.fire({
        title: "Please agree to all legal agreements",
        icon: "error",
        confirmButtonText: "Close",
        customClass: {
          popup: "bg-black/60 backdrop-blur text-white",
        },
      });
      return;
    }

    const allInfo = {
      campaignId,
      clientName,
      clientEmail,
      clientPhone,
      clientCompany,
      clientWebsite,
      clientStreetAddress,
      clientCity,
      clientState,
      clientZipCode,
      clientCountry,
      clientAdditionalNotes,
      authorityTermsAndConditions,
      truthfulInformation,
    };

    // Rewards-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "r1b1") {
      const clientRewardTierName = form.reward_tier_name.value;
      const clientRewardContributionAmount =
        form.reward_contribution_amount.value;
      const ClientRewardShippingAddress = form.reward_shipping_address.value;
      const ClientRewardDeliveryMethod = form.reward_delivery_method.value;

      const data = {
        ...allInfo,
        clientRewardTierName,
        clientRewardContributionAmount,
        ClientRewardShippingAddress,
        ClientRewardDeliveryMethod,
      };
      handleRewardsBased(event, data);
    }

    // Equity-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "e2b2") {
      const clientEquityInvestmentAmount = form.equity_investment_amount.value;
      const clientEquityTinNumber = form.equity_tin_number.value;
      const clientEquityNidNumber = form.equity_nid_number.value;
      const clientEquityDateOfBirth = form.equity_date_of_birth.value;
      const clientEquityInvestorConfirmation =
        form.equity_investor_confirmation.checked;

      const data = {
        ...allInfo,
        clientEquityInvestmentAmount,
        clientEquityTinNumber,
        clientEquityNidNumber,
        clientEquityDateOfBirth,
        clientEquityInvestorConfirmation,
      };
      handleEquityBased(event, data);
    }

    // Donation-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "d3b3") {
      const clientDonationFundHelper = form.donation_amount.value;
      const clientDonationReceiptEmail = form.donation_receipt_email.value;
      const clientDonationAnonymous = form.donation_anonymous.checked;

      const data = {
        ...allInfo,
        clientDonationFundHelper,
        clientDonationReceiptEmail,
        clientDonationAnonymous,
      };
      handleDonationBased(event, data);
    }

    // Debt-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "d4b4") {
      const clientDebtLoanAmountContributed =
        form.debt_loan_amount_contributed.value;
      const clientDebtBankName = form.debt_bank_name.value;
      const clientDebtBankAccountNumber = form.debt_bank_account_number.value;
      const clientDebtBankVisaCardNumber = form.debt_visa_card.value;
      const clientDebtAgreementRepaymentTerms =
        form.debt_agreement_repayment_terms.checked;
      const clientDebtCreditCheckAuthorization =
        form.debt_Credit_Check_Authorization.checked;

      const data = {
        ...allInfo,
        clientDebtLoanAmountContributed,
        clientDebtBankName,
        clientDebtBankAccountNumber,
        clientDebtBankVisaCardNumber,
        clientDebtAgreementRepaymentTerms,
        clientDebtCreditCheckAuthorization,
      };
      handleDebtBased(event, data);
    }
  };

  // Rewards-Based Crowdfunding Information
  const handleRewardsBased = (event, data) => {
    Swal.fire({
      title: "Do you want to submit??",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://assignment-10-backend-nine.vercel.app/user-perks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            Swal.fire({
              title: "Successfully Submitted!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });

            let backers = 1;
            if (campaign.backers) backers = campaign.backers + 1;
            const updateData = { backers };

            fetch(
              `https://assignment-10-backend-nine.vercel.app/campaign-update-backers/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              }
            )
              .then(() => {
                console.log("Successfully Updated the Campaign!");
              })
              .catch((err) => console.log(err.message));

            navigate("/campaigns");
            event.target.reset();
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
      title: "Do you want to submit??",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://assignment-10-backend-nine.vercel.app/user-perks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            Swal.fire({
              title: "Successfully Submitted!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });

            let backers = 1;
            if (campaign.backers) backers = campaign.backers + 1;
            const updateData = { backers };

            fetch(
              `https://assignment-10-backend-nine.vercel.app/campaign-update-backers/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              }
            )
              .then(() => {
                console.log("Successfully Updated the Campaign!");
              })
              .catch((err) => console.log(err.message));

            navigate("/campaigns");
            event.target.reset();
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
      title: "Do you want to submit??",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://assignment-10-backend-nine.vercel.app/user-perks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            Swal.fire({
              title: "Successfully Submitted!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });

            let backers = 1;
            if (campaign.backers) backers = campaign.backers + 1;
            const updateData = { backers };

            fetch(
              `https://assignment-10-backend-nine.vercel.app/campaign-update-backers/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              }
            )
              .then(() => {
                console.log("Successfully Updated the Campaign!");
              })
              .catch((err) => console.log(err.message));

            navigate("/campaigns");
            event.target.reset();
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
      title: "Do you want to submit??",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://assignment-10-backend-nine.vercel.app/user-perks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            Swal.fire({
              title: "Successfully Submitted!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });

            let backers = 1;
            if (campaign.backers) backers = campaign.backers + 1;
            const updateData = { backers };

            fetch(
              `https://assignment-10-backend-nine.vercel.app/campaign-update-backers/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              }
            )
              .then(() => {
                console.log("Successfully Updated the Campaign!");
              })
              .catch((err) => console.log(err.message));

            navigate("/campaigns");
            event.target.reset();
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
  // =====================================

  const {
    _id,
    campaignCategory,
    campaignStartDate,
    campaignEndDate,
    campaignTitle,
    campaignCoverImage,
    campaignName,
    campaignDescription,
    creatorCompany,
    creatorName,
    creatorCity,
    creatorCountry,
    campaignGoal,
    backers,
  } = campaign || {};
  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-10 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-4xl mx-auto border border-black/15 dark:border-white/20 p-3 lg:p-5 rounded-xl">
          <div className="">
            <div>
              <img
                className="w-full h-full rounded-lg lg:max-h-96 object-cover"
                src={campaignCoverImage}
                alt=""
              />
            </div>

            <div className="grow">
              <p className="text-xl md:text-2xl mt-4 font-semibold text-error">
                {campaignTitle}
              </p>
              <h2 className="text-2xl md:text font-semibold font-aclonica py-3">
                {campaignName}
              </h2>
              <p className="">{campaignDescription}</p>

              <div className="mt-3 grid md:grid-cols-2 gap-3">
                <div>
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

                <div className="flex items-center gap-3">
                  <div>
                    <span className="w-11 h-11 flex items-center justify-center bg-error text-xl text-white p-2">
                      <FaUser />
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {creatorCompany ? creatorCompany : creatorName}
                    </p>
                    <p>{`${creatorCity}, ${creatorCountry}`}</p>
                  </div>
                </div>
              </div>

              <p className="text-lg font-semibold mt-4">
                <span className="text-3xl font-bold">${campaignGoal}</span> USD
                by {backers?.length ? backers : 0} Backers
              </p>
            </div>

            <div>
              <Link to={`/campaign-details/${_id}`}>
                <button className="rounded-full px-14 py-2 mt-5 text-white bg-error">
                  VIEW CAMPAIGN DETAILS
                </button>
              </Link>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              {/* User Information */}
              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Your Information:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">Your Full Name</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_name"
                    required
                    placeholder="Full name"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Your Email Address</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="email"
                    name="client_email"
                    value={user?.email}
                    disabled
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Your Phone Number</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_phone"
                    required
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
                    name="client_company"
                    placeholder="Organization/Company Name"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Website Link (Optional)</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_website"
                    placeholder="Website Link"
                  />
                </label>
              </div>

              {/* User Address */}
              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Your Address:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">Street Address</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_street_address"
                    required
                    placeholder="Street Address"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">City</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_city"
                    required
                    placeholder="City"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">State/Province/Region</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_state"
                    required
                    placeholder="State/Province/Region"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Postal/ZIP Code</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_zip_code"
                    required
                    placeholder="Postal/ZIP Code"
                  />
                </label>

                <label className="block">
                  <label className="block mb-2">Country</label>
                  <input
                    className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                    type="text"
                    name="client_country"
                    required
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
                    name="client_additional_notes"
                    placeholder="Apartment number or special instructions"
                  />
                </label>
              </div>

              {/* Rewards-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "r1b1" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    For campaigns offering rewards, include:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">Selected Reward Tier</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_tier_name"
                        required
                        defaultValue={campaign?.rewardTierName}
                        placeholder="Tier name"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Amount Contributing</label>
                      <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                        <label className="p-2 px-3">$</label>
                        <input
                          className="bg-transparent  outline-none py-2 w-full"
                          type="text"
                          name="reward_contribution_amount"
                          required
                          defaultValue={campaign?.rewardContributionAmount}
                          placeholder="Contribution amounts for each reward"
                        />
                      </label>
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Shipping Address (if reward is physical)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_shipping_address"
                        placeholder="Shipping Address"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Preferred Delivery Method (optional)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="reward_delivery_method"
                        placeholder="(e.g., Standard Shipping, Express Delivery)"
                      />
                    </label>
                  </div>
                </>
              )}

              {/* Equity-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "e2b2" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    For equity campaigns, legal and financial compliance is
                    critical:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">Investment Amount</label>
                      <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                        <label className="p-2 px-3">$</label>
                        <input
                          className="bg-transparent  outline-none py-2 w-full"
                          type="text"
                          name="equity_investment_amount"
                          required
                          defaultValue={50}
                          placeholder="Investment Amount"
                        />
                      </label>
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Taxpayer Identification Number (TIN)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_tin_number"
                        required
                        placeholder="TIN number"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Government ID Number</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="equity_nid_number"
                        required
                        placeholder="Government ID Number"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Date of Birth</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="date"
                        name="equity_date_of_birth"
                        required
                        placeholder="Date of Birth"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Accredited Investor Confirmation
                      </label>
                      <label className="label cursor-pointer justify-start border border-darkThree/40 dark:border-lightTwo/40 rounded px-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name="equity_investor_confirmation"
                        />
                        <label className="ml-4 mr-5">
                          I confirm I am an accredited investor
                        </label>
                      </label>
                    </label>
                  </div>
                </>
              )}

              {/* Donation-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "d3b3" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    For donation campaigns, the information needed is generally
                    less complex:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">Donation Amount</label>
                      <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                        <label className="p-2 px-3">$</label>
                        <input
                          className="bg-transparent  outline-none py-2 w-full"
                          type="text"
                          name="donation_amount"
                          required
                          defaultValue={50}
                          placeholder="Donation amount"
                        />
                      </label>
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Receipt Email (if they want the receipt sent elsewhere)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="email"
                        name="donation_receipt_email"
                        defaultValue={user?.email}
                        placeholder="Email address"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Anonymous Donation</label>
                      <label className="label cursor-pointer justify-start border border-darkThree/40 dark:border-lightTwo/40 rounded px-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name="donation_anonymous"
                        />
                        <label className="ml-4 mr-5">
                          I want to remain anonymous
                        </label>
                      </label>
                    </label>
                  </div>
                </>
              )}

              {/* Debt-Based Crowdfunding Information */}
              {campaign?.campaignCategoryId === "d4b4" && (
                <>
                  <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                    For campaigns involving loans, you need to keep financial
                    details:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="block">
                      <label className="block mb-2">
                        Loan Amount Contributed
                      </label>
                      <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                        <label className="p-2 px-3">$</label>
                        <input
                          className="bg-transparent  outline-none py-2 w-full"
                          type="text"
                          name="debt_loan_amount_contributed"
                          required
                          defaultValue={50}
                          placeholder="Loan amount contributed"
                        />
                      </label>
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Bank Account for Repayments (optional)
                      </label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_bank_name"
                        required
                        placeholder="Bank name"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Bank Account Number</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_bank_account_number"
                        placeholder="Bank account number"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">Visa Card Number</label>
                      <input
                        className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                        type="text"
                        name="debt_visa_card"
                        placeholder="visa card number"
                      />
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Agreement to Repayment Terms
                      </label>
                      <label className="label cursor-pointer justify-start border border-darkThree/40 dark:border-lightTwo/40 rounded px-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name="debt_agreement_repayment_terms"
                        />
                        <label className="ml-4 mr-5">
                          Agree to the repayment terms
                        </label>
                      </label>
                    </label>

                    <label className="block">
                      <label className="block mb-2">
                        Credit Check Authorization
                      </label>
                      <label className="label cursor-pointer justify-start border border-darkThree/40 dark:border-lightTwo/40 rounded px-3">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name="debt_Credit_Check_Authorization"
                        />
                        <label className="ml-4 mr-5">I Agree</label>
                      </label>
                    </label>
                  </div>
                </>
              )}

              <h3 className="text-xl font-semibold text-info mt-5 mb-3">
                Legal Agreements:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <label className="block mb-2">
                    Agree to Terms of Service and Policies
                  </label>
                  <label
                    className="label cursor-pointer justify-start
              border border-darkThree/40 dark:border-lightTwo/40 rounded px-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="authority_services_terms_conditions"
                    />
                    <label className="ml-4 mr-5">I Agree</label>
                  </label>
                </label>

                <label className="block">
                  <label className="block mb-2">
                    Provided information is accurate and truthful
                  </label>
                  <label className="label cursor-pointer justify-start border border-darkThree/40 dark:border-lightTwo/40 rounded px-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="truthful_information"
                    />
                    <label className="ml-4 mr-5">
                      Yes accurate and truthful
                    </label>
                  </label>
                </label>
              </div>

              <div className="mt-7">
                <button className="btn btn-error w-full text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </section>
  );
};

export default PickYourPerk;
