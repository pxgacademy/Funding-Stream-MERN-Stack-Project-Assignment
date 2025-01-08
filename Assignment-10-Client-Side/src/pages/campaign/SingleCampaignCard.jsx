import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleCampaignCard = ({ campaign }) => {
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
    <div className="grid md:grid-cols-2 gap-3 lg:gap-5 border border-black/15 dark:border-white/30 p-3 ">
      <div>
        <img
          className="w-full h-full lg:max-h-96 object-cover"
          src={campaignCoverImage}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <div className="grow">
          <p className="text-lg font-semibold text-error">{campaignTitle}</p>
          <h2 className="text-2xl lg:text font-semibold font-aclonica py-3">
            {campaignName}
          </h2>
          <p className="">{campaignDescription}</p>

          <div className="mt-3">
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

            <div className="flex items-center gap-3 mt-3">
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

          <p className="text-lg font-semibold mt-2">
            <span className="text-3xl font-bold">${campaignGoal}</span> USD by{" "}
            {backers? backers : 0} Backers
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 font-semibold mt-4">
          <Link to={`/pick-your-perk/${_id}`}>
            <button className="w-full rounded-full py-2 text-white bg-error">
              PICK YOUR PERK
            </button>
          </Link>
          <Link to={`/campaign-details/${_id}`}>
            <button className="w-full rounded-full py-2 border border-error">
              SHOW DETAILS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SingleCampaignCard.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default SingleCampaignCard;
