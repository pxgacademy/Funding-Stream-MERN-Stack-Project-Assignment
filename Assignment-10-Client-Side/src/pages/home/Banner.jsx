import { Typewriter } from "react-simple-typewriter";
const Banner = () => {
  return (
    <div
      id="homeBanner"
      className="w-full max-w-7xl mx-auto px-5 h-full min-h-80 md:min-h-[450px] lg:min-h-[500px] bg-no-repeat bg-center bg-cover text-center flex justify-center items-start"
    >
      <div className="bg-black/20 backdrop-blur p-3 mt-2">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-aclonica text-white">
          FUNDING STREAM
        </h1>

        <span className="text-3xl md:text-4xl font-bold text-white">
          <Typewriter
            words={[
              "REWARD-BASED CROWDFUNDING",
              "EQUITY-BASED CROWDFUNDING",
              "DONATION-BASED CROWDFUNDING",
              "DEBT-BASED CROWDFUNDING",
            ]}
            loop={false}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </div>
    </div>
  );
};

export default Banner;
