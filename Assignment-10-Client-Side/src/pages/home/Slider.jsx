import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="mySwiper w-full min-h-80 md:min-h-[450px] lg:h-[500px]"
    >
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/kycQL6J/funding4.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-white/30 backdrop-blur text-black border p-2">
            <h2 className="text-3xl font-semibold">
              Rewards-Based Crowdfunding
            </h2>
            <h5 className="text-xl font-semibold">
              Turn Ideas into Reality with Exclusive Perks
            </h5>
            <p>
              Engage your backers by offering unique rewards in exchange for
              their support. Whether it’s early access to your product,
              exclusive merchandise, or personalized experiences, let your
              supporters feel valued while helping you achieve your goals.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/YyXvBKp/funding2.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-white/30 backdrop-blur text-black border p-2">
            <h2 className="text-3xl font-semibold">
              Equity-Based Crowdfunding
            </h2>
            <h5 className="text-xl font-semibold">
              Invest in Innovation, Own the Future
            </h5>
            <p>
              Attract investors by offering a share in your business. With
              equity-based crowdfunding, you can secure funding while allowing
              your backers to become stakeholders, sharing in your success as
              your venture grows.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/bBnWzr3/funding1.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-white/30 backdrop-blur text-black border p-2">
            <h2 className="text-3xl font-semibold">
              Donation-Based Crowdfunding
            </h2>
            <h5 className="text-xl font-semibold">
              Make a Difference, One Contribution at a Time
            </h5>
            <p>
              Raise funds for causes that matter. Whether it's helping a person
              in need, supporting a community project, or funding a charity,
              donation-based crowdfunding connects you with compassionate
              contributors eager to make an impact.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/d5GmhJR/funding3.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-white/30 backdrop-blur text-black border p-2">
            <h2 className="text-3xl font-semibold">Debt-Based Crowdfunding</h2>
            <h5 className="text-xl font-semibold">
              Borrow Funds, Build Dreams
            </h5>
            <p>
              Secure the financial support you need with a repayment plan that
              works for you. Debt-based crowdfunding allows borrowers to access
              funds while offering lenders a clear and fair return on their
              investment.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
