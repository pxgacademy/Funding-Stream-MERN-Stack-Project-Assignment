import { useContext } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import MyDonation from "./MyDonation";
import MyCampaigns from "./MyCampaigns";

const Dashboard = () => {
  const { isDark } = useContext(AuthContext);
  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-10 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white px-5">
        <section className="max-w-7xl mx-auto">

        <div>
        <h4 className="text-3xl font-semibold text-center" >Your Campaigns</h4>
        <MyCampaigns/>
        </div>


          <div className="border border-neutral p-4 mt-20 rounded-lg">
            <h4 className="text-3xl font-semibold text-center" >Your Donation</h4>
            <MyDonation/>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Dashboard;
