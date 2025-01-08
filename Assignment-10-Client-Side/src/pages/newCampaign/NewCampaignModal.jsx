import { useState } from "react";
import RewardsBased from "./RewardsBased";
import EquityBased from "./EquityBased";
import DonationBased from "./DonationBased";
import DebtBased from "./DebtBased";

const NewCampaignModal = () => {
  const [tabIndex, setTabIndex] = useState(2);
  const modal2 = document.getElementById("my_modal_3");
  const list = [
    "Rewards-based",
    "Equity-based",
    "Donation-based",
    "Debt-based",
  ];
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box max-w-2xl bg-gradient-radial from-rose-800 to-purple-900 bg-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-neutral absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 md:rounded-full rounded overflow-hidden bg-darkThree">
            {list.map((item, i) => (
              <button
                key={i}
                className={`py-2 w-full transition-all duration-300 text-white/90 ${
                  tabIndex === i ? "bg-error text-white rounded md:rounded-full" : ""
                }`}
                onClick={() => setTabIndex(i)}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            {tabIndex === 0 && <RewardsBased />}
            {tabIndex === 1 && <EquityBased />}
            {tabIndex === 2 && <DonationBased />}
            {tabIndex === 3 && <DebtBased />}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default NewCampaignModal;
