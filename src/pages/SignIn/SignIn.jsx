import Lottie from "lottie-react";
import loginLottie from "../../assets/Lottie/loginLottie.json";
import useAuth from "../../hooks/useAuth";
const SignIn = () => {
  const { signInUser } = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((res) => {
        console.log(res?.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left max-w-96">
          <Lottie animationData={loginLottie}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />

              <input value="Login" type="submit" className="btn btn-neutral mt-4" />
              
              
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
