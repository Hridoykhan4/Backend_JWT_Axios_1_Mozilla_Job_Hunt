import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/bannerImg/img1.jpg";
import img2 from "../assets/bannerImg/img2.jpg";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // set on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="hero py-16 px-6 md:px-16  rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="hero-content flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold  leading-tight mb-4">
            Discover Your Dream{" "}
            <motion.span
              animate={{ color: ["#f59e0b", "#a3e635", "#facc15"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="inline-block"
            >
              Job
            </motion.span>
          </h1>
          <p className="text-lg  mb-6 max-w-md mx-auto lg:mx-0">
            Handpicked roles tailored to your skills & passions. Let your career
            journey begin with elegance and confidence.
          </p>
          <button className="btn bg-yellow-400 text-white font-semibold border-none hover:bg-yellow-500 transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex flex-col md:flex-row items-center gap-6 justify-center">
          <motion.img
            src={img1}
            alt="Career path visual"
            className="w-64 h-64 object-cover rounded-xl shadow-md border-4 border-blue-200"
            animate={
              isMobile
                ? {} // no animation for mobile
                : { y: [0, -15, 0] }
            }
            transition={
              isMobile
                ? {}
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.img
            src={img2}
            alt="Opportunity visual"
            className="w-64 h-64 object-cover rounded-xl shadow-md border-4 border-blue-200"
            animate={isMobile ? {} : { y: [0, 15, 0] }}
            transition={
              isMobile
                ? {}
                : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
