import Lottie from "lottie-react";
import registerAnime from "../../assets/Lottie/registerLottie.json";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const { createUser } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const isValid = () => {
      if (!/^.{6,}$/.test(password)) {
        return alert(`Pass must be more than 6 characters`);
      }

      if (!/[A-Z]/.test(password)) {
        return alert(`Password should contain at least one uppercase letter`);
      }

      if (!/\d/.test(password)) {
        return alert(`Password should contain a digit`);
      }
    };

    isValid();

    createUser(email, password)
      .then((res) => {
        console.log(res?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left max-w-96">
          <Lottie animationData={registerAnime}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
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

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
