import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utilities/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import CampaignCardHome from "./CampaignCardHome";
import Banner from "./Banner";
import bannerImg from "/banner.jpg";
import { FaAward, FaDonate } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { FcDebt } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import Slider from "./Slider";

const Home = () => {
  const { isDark } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);

  // Campaign Loader
  useEffect(() => {
    window.scrollTo(0, 0);
    handleCampaignLoading();
  }, []);

  const handleCampaignLoading = () => {
    axios
      .get(`https://assignment-10-backend-nine.vercel.app/campaigns/running`)
      .then((response) => {
        setCampaigns(response.data);
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

  return (
    <section className={`${isDark && "dark"} w-full`}>
      <section className="pb-24 pt-10 bg-lightTwo dark:bg-darkThree text-darkOne dark:text-white">
        <div>
          <Banner />
        </div>

        <div className="mt-16 w-full max-w-7xl mx-auto h-full bg-no-repeat bg-center bg-cover text-center flex justify-center items-start">
          <Slider />
        </div>
        <section className="px-5 mt-16">
          <section className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-7 p-5 bg-black/5 dark:bg-white/5 mb-10">
              <div>
                <img className="w-full rounded-sm" src={bannerImg} alt="" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl lg:text-4xl font-semibold mb-2">
                  Welcome to Funding Stream
                </h2>
                <p>
                  The ultimate platform for turning ideas into reality. Whether
                  you're seeking to fund a creative project, support a cause, or
                  invest in groundbreaking ventures, we connect dreamers and
                  backers to make impactful campaigns possible. Start your
                  journey today—create, contribute, and inspire change!
                </p>

                <div className="flex justify-end mt-5">
                  <Link to="/campaigns">
                    <button className="btn btn-neutral px-10 text-white rounded-none">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-5 bg-black/5 dark:bg-white/5 mb-10 mt-16">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  OUR CAMPAIGN CATEGORIES
                </h2>
                <p>
                  Empower innovation, fuel dreams, and create impact with our
                  diverse crowdfunding options. Whether you're offering rewards,
                  equity, seeking donations, or borrowing funds, Funding Stream
                  connects you to the support you need to bring your vision to
                  life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-7 lg:grid-cols-4 mt-6 text-center">
                <div className="border border-black/10 dark:border-white/15 p-4">
                  <span className="w-full flex items-center justify-center min-h-20 text-5xl text-darkThree dark:text-white/90">
                    <FaAward />
                  </span>
                  <h4 className="text-2xl font-semibold text-darkThree dark:text-white/90 mb-2">
                    Rewards-Based Crowdfunding
                  </h4>
                  <p className="text-justify">
                    Bring your creative ideas to life! Offer exclusive rewards
                    to backers who believe in your vision and help you achieve
                    your funding goals.
                  </p>
                </div>
                <div className="border border-black/10 dark:border-white/15 p-4">
                  <span className="w-full flex items-center justify-center min-h-20 text-5xl text-darkThree dark:text-white/90">
                    <GiInjustice />
                  </span>
                  <h4 className="text-2xl font-semibold text-darkThree dark:text-white/90 mb-2">
                    Equity-Based Crowdfunding
                  </h4>
                  <p className="text-justify">
                    Empower investors to own a piece of your success. Share
                    equity in your business and gain the support you need to
                    grow.
                  </p>
                </div>
                <div className="border border-black/10 dark:border-white/15 p-4">
                  <span className="w-full flex items-center justify-center min-h-20 text-5xl text-darkThree dark:text-white/90">
                    <FaDonate />
                  </span>
                  <h4 className="text-2xl font-semibold text-darkThree dark:text-white/90 mb-2">
                    Donation-Based Crowdfunding
                  </h4>
                  <p className="text-justify">
                    Make a difference in the world. Start a campaign to fund
                    causes you care about and inspire generosity from
                    compassionate supporters.
                  </p>
                </div>
                <div className="border border-black/10 dark:border-white/15 p-4">
                  <span className="w-full flex items-center justify-center min-h-20 text-5xl text-darkThree dark:text-white/90">
                    <FcDebt />
                  </span>
                  <h4 className="text-2xl font-semibold text-darkThree dark:text-white/90 mb-2">
                    Debt-Based Crowdfunding
                  </h4>
                  <p className="text-justify">
                    Secure funding with flexible repayment terms. Borrow from a
                    community of backers to grow your venture or address
                    personal financial needs.
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-center mt-10">
                <Link to="/campaigns">
                  <button className="btn btn-ghost border-neutral dark:border-lightThree px-14">
                    ALL CAMPAIGNS
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-black/5 dark:bg-white/5 rounded-sm p-4 mt-16">
              <h2 className="text-xl md:text-3xl font-semibold text-center mb-5">
                Latest Campaigns
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {campaigns.map((campaign) => (
                  <CampaignCardHome key={campaign._id} campaign={campaign} />
                ))}
              </div>
            </div>

            <section className="mt-16 grid lg:grid-cols-2 gap-10 p-5 bg-black/5 dark:bg-white/5 rounded-sm">
              <div className="flex items-center">
                <div className="w-full">
                  <h2 className="font-BerkshireSwash text-4xl lg:text-7xl">
                    Frequently Asked Questions!
                  </h2>
                  <div className="text-7xl flex justify-center mt-10 animate-bounce">
                    <FaPersonCircleQuestion />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    What is crowdfunding?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Crowdfunding is a way of raising funds for a project,
                      business, or cause by collecting small contributions from
                      a large number of people, typically through an online
                      platform like Funding Stream.
                    </p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    What types of crowdfunding campaigns can I create on Funding
                    Stream?
                  </div>
                  <div className="collapse-content">
                    <p>We support four types of campaigns:</p>
                    <ol className="pl-5 mt-2">
                      <li className="list-disc">
                        <span className="font-semibold">Rewards-based: </span>
                        Offer rewards or perks in exchange for contributions.
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold">Equity-based: </span>
                        Offer rewards or perks in exchange for contributions.
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold">Donation-based: </span>
                        Raise funds for charitable or personal causes.
                      </li>
                      <li className="list-disc">
                        <span className="font-semibold">Debt-based: </span>
                        Borrow funds with an agreement to repay with interest.
                      </li>
                    </ol>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    How do I start a campaign?
                  </div>
                  <div className="collapse-content">
                    <p>
                      To start a campaign, simply create an account, select the
                      type of crowdfunding you want, and fill out the campaign
                      form with details like your goal, description, and media
                      assets. Once submitted, your campaign will be reviewed and
                      published.
                    </p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    How can I support a campaign?
                  </div>
                  <div className="collapse-content">
                    <p>
                      You can support a campaign by visiting its page, selecting
                      the funding tier or contribution amount, and completing
                      your payment securely through our platform. Depending on
                      the campaign, you may receive a reward, equity, or updates
                      on how your donation is used.
                    </p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    Are there any fees to use Funding Stream?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Yes, Funding Stream charges a small platform fee for
                      successfully funded campaigns. The fee depends on the type
                      of campaign and will be detailed in the terms when you
                      create your campaign.
                    </p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    How will I receive funds from my campaign?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Funds are typically transferred to your designated account
                      after the campaign ends successfully. Depending on the
                      campaign type and payment method, processing times may
                      vary.
                    </p>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="collapse collapse-arrow rounded-sm bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/20 "
                >
                  <div className="collapse-title text-xl font-medium">
                    Is my information and payment secure?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Absolutely. Funding Stream uses secure encryption and
                      trusted payment gateways to protect your information and
                      ensure a safe transaction experience for all users.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Home;
