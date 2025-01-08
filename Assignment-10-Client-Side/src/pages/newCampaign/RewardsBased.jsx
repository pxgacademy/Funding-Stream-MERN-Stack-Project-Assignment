import { Link } from "react-router-dom";

const RewardsBased = () => {
  const closeModal2 = () => document.getElementById("my_modal_3").close();
  return (
    <div className="w-full mt-5 text-white bg-white/20 backdrop-blur p-5 rounded-xl">
      <h2 className="font-aclonica text-2xl md:text-5xl ">
        Rewards-based crowdfunding
      </h2>
      <p className="text-xl md:text-2xl mt-3">
        Launch your campaign, secure funding, and build community
      </p>
      <p className="mt-2">
        <span className="font-semibold">Description:</span> Rewards-based
        crowdfunding involves individuals contributing to your project in
        exchange for a non-monetary reward. This could be anything from a
        thank-you note to the finished product. This type is often used for
        creative projects, such as films, music albums, or new products.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Benefits: </span>
        Provides backers with a tangible reward, creating a sense of ownership.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Considerations: </span>
        Requires fulfilling promises which can be costly and time-consuming if
        not planned well.
      </p>

      <Link to="/create-campaign/r1b1">
        <button
          onClick={closeModal2}
          className="py-3 px-10 mt-5 bg-green-500 hover:bg-green-600 text-darkOne font-semibold"
        >
          Start Your Campaign
        </button>
      </Link>
    </div>
  );
};

export default RewardsBased;
