import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyCampaignCard = ({ campaign, handleDeleteCampaign }) => {
  const {
    _id,
    campaignCategoryId,
    campaignCategory,
    campaignStartDate,
    campaignEndDate,
    campaignTitle,
    campaignCoverImage,
    campaignName,
    campaignDescription,
    campaignGoal,
    backers,
  } = campaign;
  return (
    <div className="border border-neutral/20 dark:border-neutral rounded-lg flex flex-col p-4">
      <div className="w-full h-full max-h-56">
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
        </div>

        <p className="text-lg font-semibold mt-4">
          <span className="text-3xl font-bold">${campaignGoal}</span> USD by{" "}
          {backers?.length ? backers : 0} Backers
        </p>
      </div>

      <div>
        <Link to={`/campaign-details/${_id}`}>
          <button className="rounded-full w-full px-14 py-2 mt-5 text-white bg-error">
            VIEW CAMPAIGN DETAILS
          </button>
        </Link>
        <Link to={`/update-campaign/${_id}`}>
          <button className="mt-2 rounded-full w-full py-2 text-white bg-error">
            Update Campaign
          </button>
        </Link>

        <button
          onClick={() => handleDeleteCampaign(_id)}
          className="mt-2 rounded-full w-full py-2 border border-error"
        >
          Delete Campaign
        </button>
      </div>
    </div>
  );
};

MyCampaignCard.propTypes = {
  campaign: PropTypes.object.isRequired,
  handleDeleteCampaign: PropTypes.func.isRequired,
};

export default MyCampaignCard;
