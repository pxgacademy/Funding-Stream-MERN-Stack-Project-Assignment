
import { Link } from "react-router-dom";

const EquityBased = () => {
  const closeModal2 = ()=> document.getElementById("my_modal_3").close()
  return (
    <div className="w-full mt-5 text-white bg-white/20 backdrop-blur p-5 rounded-xl">
      <h2 className="font-aclonica text-2xl md:text-5xl ">
        Equity-Based crowdfunding
      </h2>
      <p className="text-xl md:text-2xl mt-3">
        Launch your campaign, secure funding, and build community
      </p>
      <p className="mt-2">
        <span className="font-semibold">Description:</span> Equity-based
        crowdfunding allows individuals to invest in your business in exchange
        for equity or shares. This means that contributors become part-owners of
        your company and may benefit financially if the company succeeds.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Benefits: </span>
        Attracts serious investors and raises significant capital.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Considerations: </span>
        Dilutes ownership and requires adherence to securities regulations.
      </p>

      <Link to="/create-campaign/e2b2">
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

export default EquityBased;
