import React, { useRef} from "react";
import signUpImage from "../assets/signup.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef=useRef<HTMLInputElement>(null);
  const repeatPasswordRef=useRef<HTMLInputElement>(null);
//   const [,forceRender]=useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      alert("Passwords do not match!");
      return;
    }
    const email = emailRef.current?.value;
    const password=passwordRef.current?.value;
    const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
        email:email,
        password:password
    })
    if(response.status===200){
        const token = response.data.token;
        localStorage.setItem("token",token);
        navigate('/dashboard')
    }
    else{
        alert("Please enter valid Fields or user not exist Signup first")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl flex w-[900px] max-w-5xl overflow-hidden">
        {/* Left: Signup Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-blue-700">Sign In now</h1>
          <p className="text-gray-500 mb-6">Join us and start off</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                ref={emailRef}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                type="password"
                ref={repeatPasswordRef}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Repeat password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Dont have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right: Image + Text */}
        <div className="w-1/2 relative">
          <img
            src={signUpImage}
            alt="Signup visual"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl font-bold">Bring your ideas to life.</h2>
            <p className="text-sm mt-2 max-w-sm">
              Login now  and enjoy access to all features for 30 days. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
