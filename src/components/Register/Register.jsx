import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);
    // reset success
    setSuccess("");
    // reset error
    setRegisterError("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one uppercase characters."
      );
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Created Successfully");

        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => console.log('profile updated'))
        .catch()

        // send verification email:
        sendEmailVerification(result.user)
          .then(() => {
            alert("Please check your email and verify your account");
          })
          .catch();
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full py-2 px-4"
            type="text"
            name="name"
            placeholder="First Name"
            id=""
            required
          />
          <br />
          <input
            className="mb-4 w-full py-2 px-4"
            type="email"
            name="email"
            placeholder="Email Address"
            id=""
            required
          />
          <br />
          <div className="mb-4 relative">
            <input
              className="w-full py-2 px-4"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id=""
              required
            />
            <span
              className="absolute top-3 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <br />
          <div className="mb-1">
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">
              Accept out <a href="">Terms & conditions</a>
            </label>
          </div>
          <br />
          <input
            className=" btn btn-secondary mb-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-700">{success}</p>}
        <p>
          Already have an account? <Link to="/login">Please Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
