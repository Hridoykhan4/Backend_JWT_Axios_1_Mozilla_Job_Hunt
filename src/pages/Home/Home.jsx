import Banner from "../../components/Banner";
import useScrollTo from "../../hooks/useScrollTo";
import FeaturedJobs from "./FeaturedJobs";
const Home = () => {
  useScrollTo();

  return (
    <>
      <Banner></Banner>
      <section>
        <FeaturedJobs></FeaturedJobs>
      </section>
    </>
  );
};

export default Home;
