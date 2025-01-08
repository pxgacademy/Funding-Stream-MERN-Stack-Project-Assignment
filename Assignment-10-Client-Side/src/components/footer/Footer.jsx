import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-5 bg-darkTwo text-white max-w-screen-2xl mx-auto">
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid lg:grid-cols-3 gap-8 pb-10 border-b border-zinc-700">
          <div>
          <h3 className="text-2xl font-aclonica text-white">Funding Stream</h3>
            <p className="mt-8">
              Making a Difference, One Act of <br /> Kindness at a time.
            </p>

            <div className="text-white space-x-2 mt-3">
              <span className="inline-block p-2 bg-white/10 hover:bg-error">
                <FaFacebook />
              </span>
              <span className="inline-block p-2 bg-white/10 hover:bg-error">
                <FaLinkedin />
              </span>
              <span className="inline-block p-2 bg-white/10 hover:bg-error">
                <FaTwitter />
              </span>
              <span className="inline-block p-2 bg-white/10 hover:bg-error">
                <FaInstagram />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h5 className="text-xl font-semibold text-zinc-100">
                Quick Links
              </h5>
              <div className="flex flex-col mt-4 text-zinc-300 space-y-1">
                <Link to="/">Home</Link>
                <Link to="/campaigns">Campaigns</Link>
                <Link to="/help">Help</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>

            <div>
              <h5 className="text-xl font-semibold text-zinc-100">Company</h5>
              <div className="flex flex-col mt-4 text-zinc-300 space-y-1">
                <Link to="/termsAndConditions">Terms & Conditions</Link>
                <Link to="/privacyPolicy">Privacy Policy</Link>
                <Link to="/cookiePreferences">Cookie Preferences</Link>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-error p-5 text-white">
              <h5 className="text-3xl md:text-5xl font-semibold">
                Have you any questions or want to create campaign?
              </h5>
              <Link to="/contact">
                <button className="btn btn-neutral rounded-none text-white py-2 px-7 mt-5">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-lg text-center">
            &copy; 2024 Muhammad Abdullah All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
