import Header from "../header/Header";

const ErrorPage = () => {
  return (
    <section className="px-5 bg-white">
      <Header />
      <section className="max-w-7xl mx-auto">
        <div className="h-screen w-full flex justify-center">
          <img
            className="h-3/4 mt-7"
            src="https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/404-animation.gif"
            alt=""
          />
        </div>
      </section>
    </section>
  );
};

export default ErrorPage;
