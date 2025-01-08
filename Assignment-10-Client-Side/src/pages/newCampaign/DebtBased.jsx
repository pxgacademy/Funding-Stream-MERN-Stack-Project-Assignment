import { Link } from "react-router-dom";

const DebtBased = () => {
  const closeModal2 = () => document.getElementById("my_modal_3").close();

  return (
    <div className="w-full mt-5 text-white bg-white/20 backdrop-blur p-5 rounded-xl">
      <h2 className="font-aclonica text-2xl md:text-5xl ">
        Debt-Based Crowdfunding{" "}
        <span className="text-lg">(P-to-P Lending)</span>
      </h2>
      <p className="text-xl md:text-2xl mt-3">
        Launch your campaign, secure funding, and build community
      </p>
      <p className="mt-2">
        <span className="font-semibold">Description:</span> Debt-based
        crowdfunding, also known as peer-to-peer (P2P) lending, involves
        individuals lending money to a business or individual with the
        expectation of being repaid with interest. This is similar to a
        traditional loan but is often faster and easier to obtain.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Benefits: </span>
        Access to capital without giving up equity.
      </p>
      <p className="mt-2">
        <span className="font-semibold">Considerations: </span>
        Requires repayment with interest, which can be a financial burden if the
        project does not generate expected returns.
      </p>

      <Link to="/create-campaign/d4b4">
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

export default DebtBased;
