import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utilities/AuthProvider";

const MyDonationCard = ({ donation, handleDeleteDonation }) => {
  const { user } = useContext(AuthContext);
  const [campaign, setCampaign] = useState([]);

  const modal3 = document.getElementById("my_modal_1");

  useEffect(() => {
    handleDonationCampaignLoading();
  }, [donation]);

  const handleDonationCampaignLoading = () => {
    axios
      .get(
        `https://assignment-10-backend-nine.vercel.app/my-donation-campaign/${donation.campaignId}`
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
    modal3.close();

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

      const data = {
        ...allInfo,
        clientEquityInvestmentAmount,
        clientEquityTinNumber,
        clientEquityNidNumber,
        clientEquityDateOfBirth,
      };
      handleEquityBased(event, data);
    }

    // Donation-Based Crowdfunding Information
    if (campaign.campaignCategoryId === "d3b3") {
      const clientDonationFundHelper = form.donation_amount.value;
      const clientDonationReceiptEmail = form.donation_receipt_email.value;

      const data = {
        ...allInfo,
        clientDonationFundHelper,
        clientDonationReceiptEmail,
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

      const data = {
        ...allInfo,
        clientDebtLoanAmountContributed,
        clientDebtBankName,
        clientDebtBankAccountNumber,
        clientDebtBankVisaCardNumber,
      };
      handleDebtBased(event, data);
    }
  };

  // Rewards-Based Crowdfunding Information
  const handleRewardsBased = (event, data) => {
    Swal.fire({
      title: "Do you want to Update?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/update-perks/${donation._id}`,
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
              title: "Successfully Updated!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
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
            }).then(() => modal3.showModal())
          );
      }
    });
  };

  const handleEquityBased = (event, data) => {
    Swal.fire({
      title: "Do you want to Update?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/update-perks/${donation._id}`,
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
              title: "Successfully Updated!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
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
            }).then(() => modal3.showModal())
          );
      }
    });
  };
  const handleDonationBased = (event, data) => {
    Swal.fire({
      title: "Do you want to Update?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/update-perks/${donation._id}`,
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
              title: "Successfully Updated!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
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
            }).then(() => modal3.showModal())
          );
      }
    });
  };
  const handleDebtBased = (event, data) => {
    Swal.fire({
      title: "Do you want to Update?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
      cancelButtonText: "Cancel!",
      customClass: {
        popup: "bg-black/60 backdrop-blur text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-backend-nine.vercel.app/update-perks/${donation._id}`,
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
              title: "Successfully Updated!",
              icon: "success",
              confirmButtonText: "Close",
              customClass: {
                popup: "bg-black/60 backdrop-blur text-white",
              },
            });
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
            }).then(() => modal3.showModal())
          );
      }
    });
  };
  // =====================================

  const {
    _id,
    campaignCategoryId,
    campaignStartDate,
    campaignEndDate,
    campaignTitle,
    campaignCoverImage,
    campaignName,
    campaignDescription,
    campaignGoal,
    backers,
  } = campaign || {};

  return (
    <div className="border border-error/50 p-3 rounded grid">
      <div className="w-full h-full min-h-44">
        <img
          className="w-full h-full object-cover rounded"
          src={campaignCoverImage}
          alt=""
        />
      </div>

      <div className="mt-3 flex flex-col">
        <div className="grow">
          <p className="text-error">{campaignTitle}</p>
          <h3 className="text-xl my-2">{campaignName}</h3>
          <p>{campaignDescription}</p>

          <p className="mt-3">Campaign Start Date: {campaignStartDate}</p>
          <p>Campaign End Date: {campaignEndDate}</p>

          <p className="mt-3">Campaign Goal: {campaignGoal}</p>
          <p>Backers: {backers ? backers : 0}</p>

          {campaignCategoryId === "r1b1" && (
            <div className="mt-3">
              <p>Tier Name: {donation.clientRewardTierName}</p>
              <p>
                Contribution Amount: {donation.clientRewardContributionAmount}
              </p>
              <p>Shipping Address: {donation.ClientRewardShippingAddress}</p>
              <p>Delivery Method: {donation.ClientRewardDeliveryMethod}</p>
            </div>
          )}

          {campaignCategoryId === "e2b2" && (
            <div className="mt-3">
              <p>Investment Amount: {donation.clientEquityInvestmentAmount}</p>
              <p>TIN Number: {donation.clientEquityTinNumber}</p>
              <p>NID Number: {donation.clientEquityNidNumber}</p>
              <p>Date of Birth: {donation.clientEquityDateOfBirth}</p>
            </div>
          )}

          {campaignCategoryId === "d3b3" && (
            <div className="mt-3">
              <p>Donation Fund Helper: {donation.clientDonationFundHelper}</p>
              <p>Receipt Email: {donation.clientDonationReceiptEmail}</p>
            </div>
          )}

          {campaignCategoryId === "d4b4" && (
            <div className="mt-3">
              <p>
                Contributed Amount: {donation.clientDebtLoanAmountContributed}
              </p>
              <p>Bank Name: {donation.clientDebtBankName}</p>
              <p>Account Number: {donation.clientDebtBankAccountNumber}</p>
              <p>Visa Number: {donation.clientDebtBankVisaCardNumber}</p>
            </div>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-error/50">
          <Link to={`/campaign-details/${_id}`}>
            <button className="btn w-full btn-ghost">View Campaign</button>
          </Link>
          <button
            onClick={() => handleDeleteDonation(donation._id)}
            className="mt-2 btn w-full btn-ghost"
          >
            Delete Donation
          </button>
          <button
            onClick={() => modal3.showModal()}
            className="mt-2 btn w-full btn-ghost border border-neutral/20 dark:border-neutral"
          >
            Edit Donation
          </button>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white dark:bg-darkThree">
          <button
            onClick={() => modal3.close()}
            className="btn btn-sm text-white btn-circle btn-neutral absolute right-2 top-2"
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            {/* User Information */}
            <h3 className="text-xl font-semibold text-info mt-5 mb-3">
              Your Information:
            </h3>
            <div className="grid gap-3">
              <label className="block">
                <label className="block mb-2">Your Full Name</label>
                <input
                  className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                  type="text"
                  name="client_name"
                  disabled
                  value={donation.clientName}
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
                  defaultValue={donation?.clientPhone}
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
                  defaultValue={donation?.clientCompany}
                  placeholder="Organization/Company Name"
                />
              </label>

              <label className="block">
                <label className="block mb-2">Website Link (Optional)</label>
                <input
                  className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                  type="text"
                  name="client_website"
                  defaultValue={donation?.clientWebsite}
                  placeholder="Website Link"
                />
              </label>
            </div>

            {/* User Address */}
            <h3 className="text-xl font-semibold text-info mt-5 mb-3">
              Your Address:
            </h3>
            <div className="grid gap-3">
              <label className="block">
                <label className="block mb-2">Street Address</label>
                <input
                  className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                  type="text"
                  name="client_street_address"
                  required
                  defaultValue={donation?.clientStreetAddress}
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
                  defaultValue={donation?.clientCity}
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
                  defaultValue={donation?.clientState}
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
                  defaultValue={donation?.clientZipCode}
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
                  defaultValue={donation?.clientCountry}
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
                  defaultValue={donation?.clientAdditionalNotes}
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
                <div className="grid gap-3">
                  <label className="block">
                    <label className="block mb-2">Selected Reward Tier</label>
                    <input
                      className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                      type="text"
                      name="reward_tier_name"
                      required
                      defaultValue={donation?.clientRewardTierName}
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
                        defaultValue={donation?.clientRewardContributionAmount}
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
                      defaultValue={donation?.ClientRewardShippingAddress}
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
                      defaultValue={donation?.ClientRewardDeliveryMethod}
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
                <div className="grid gap-3">
                  <label className="block">
                    <label className="block mb-2">Investment Amount</label>
                    <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                      <label className="p-2 px-3">$</label>
                      <input
                        className="bg-transparent  outline-none py-2 w-full"
                        type="text"
                        name="equity_investment_amount"
                        required
                        defaultValue={donation?.clientEquityInvestmentAmount}
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
                      defaultValue={donation?.clientEquityTinNumber}
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
                      defaultValue={donation?.clientEquityNidNumber}
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
                      defaultValue={donation?.clientEquityDateOfBirth}
                      placeholder="Date of Birth"
                    />
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
                <div className="grid grid-cols-1 gap-3">
                  <label className="block">
                    <label className="block mb-2">Donation Amount</label>
                    <label className="flex border border-darkThree/40 dark:border-lightTwo/40 rounded">
                      <label className="p-2 px-3">$</label>
                      <input
                        className="bg-transparent  outline-none py-2 w-full"
                        type="text"
                        name="donation_amount"
                        required
                        defaultValue={donation?.clientDonationFundHelper}
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
                      defaultValue={donation?.clientDonationReceiptEmail}
                      placeholder="Email address"
                    />
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
                <div className="grid gap-3">
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
                        defaultValue={donation?.clientDebtLoanAmountContributed}
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
                      defaultValue={donation?.clientDebtBankName}
                      placeholder="Bank name"
                    />
                  </label>

                  <label className="block">
                    <label className="block mb-2">Bank Account Number</label>
                    <input
                      className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                      type="text"
                      name="debt_bank_account_number"
                      defaultValue={donation?.clientDebtBankAccountNumber}
                      placeholder="Bank account number"
                    />
                  </label>

                  <label className="block">
                    <label className="block mb-2">Visa Card Number</label>
                    <input
                      className="bg-transparent border border-darkThree/40 dark:border-lightTwo/40 outline-none py-2 px-3 rounded w-full"
                      type="text"
                      name="debt_visa_card"
                      defaultValue={donation?.clientDebtBankVisaCardNumber}
                      placeholder="visa card number"
                    />
                  </label>
                </div>
              </>
            )}

            <div className="mt-7">
              <button className="btn btn-error w-full text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

MyDonationCard.propTypes = {
  donation: PropTypes.object.isRequired,
  handleDeleteDonation: PropTypes.func.isRequired,
};

export default MyDonationCard;
