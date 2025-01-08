import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const CampaignCardHome = ({ campaign }) => {
  const {
    _id,
    campaignCategory,
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
    <div className="flex flex-col border border-black/15 dark:border-white/20 p-3 rounded-sm">
      <img
        className="w-full h-full max-h-60 object-cover rounded-sm"
        src={campaignCoverImage}
        alt=""
      />

      <p className="text-xl md:text-2xl mt-4 font-semibold text-error">
        {campaignTitle}
      </p>

      <h2 className="text-2xl md:text font-semibold font-aclonica py-3">
        {campaignName}
      </h2>
      <p>{campaignDescription}</p>

      <div className="mt-3">
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

      <p className="text-lg font-semibold mt-4 grow">
        <span className="text-3xl font-bold">${campaignGoal}</span> USD by{" "}
        {backers?.length ? backers : 0} Backers
      </p>

      <div className="">
        <Link to={`/campaign-details/${_id}`}>
          <button className="rounded-full w-full px-14 py-2 mt-5 text-white btn btn-error">
            VIEW CAMPAIGN DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
};

CampaignCardHome.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default CampaignCardHome;
