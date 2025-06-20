import Lottie from "lottie-react";
import lottieLoad from "../assets/Lottie/loading.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-white">
      <div className="w-40">
        <Lottie animationData={lottieLoad} loop={true} />
      </div>
    </div>
  );
};

export default Spinner;
