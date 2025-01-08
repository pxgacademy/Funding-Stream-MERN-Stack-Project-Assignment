import { Link } from "react-router-dom";

const DonationBased = () => {

  const closeModal2 = ()=> document.getElementById("my_modal_3").close()
  return (
    <div className="w-full mt-5 text-white bg-white/20 backdrop-blur p-5 rounded-xl">
      <h2 className="font-aclonica text-2xl md:text-5xl ">
        Donation-Based crowdfunding
      </h2>
      <p className="text-xl md:text-2xl mt-3">
        Launch your campaign, secure funding, and build community
      </p>
      <p className="mt-2">
        <span className="font-semibold">Description:</span> Donation-based
        crowdfunding involves individuals donating small amounts of money to
        support a cause or project without expecting any return. This type is
        commonly used for charitable, social, or personal causes.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Benefits: </span>
        No obligation to return the money; perfect for causes and charity.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Considerations: </span>
        Relies heavily on the emotional appeal of the cause.
      </p>

      <Link to="/create-campaign/d3b3">
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


export default DonationBased;
