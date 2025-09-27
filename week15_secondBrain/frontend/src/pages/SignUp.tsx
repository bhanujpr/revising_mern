import { CustomInput } from "../components/ui/CustomInput";
import { Button } from "../components/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

  async function Signup() {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      alert("You have signed up successfully!");
      navigate('/signin')
    } catch (err) {
      console.error(err);
      alert("Signup failed, check console for error");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-6">
          {/* Logo + Title */}
          <div className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            BhanuBrain
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
            SignUp
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <CustomInput ref={userNameRef} type="email" placeholder="Your email" />
            <CustomInput ref={passwordRef} type="password" placeholder="Password" />

            {/* Submit Button, centered */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="md"
                text="Create new account"
                onClick={Signup}
              />
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
