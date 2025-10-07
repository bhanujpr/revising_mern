"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SldeCover from "../assets/SIdeCover.jpg"; // ✅ Correct Next.js import path
import InputComponent from "./InputComponent";
import Button from "./Button";
import Link from "next/link";
import axios from "axios";
import { error } from "console";

function AuthPage({
  mainHeading,
  secondaryHeading,
  compo,
  imageText1,
  imageText2,
  downText,
}: {
  mainHeading: string;
  secondaryHeading: string;
  compo: string;
  imageText1: string;
  imageText2: string;
  downText: string;
}) {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (compo === "signup") {
      if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const email = emailRef.current?.value;
        const name = nameRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(email);

        const response = await axios.post("http://localhost:3001/signup", {
          email: email,
          username: username,
          password: password,
          name: name,
          photo: "update Soon",
        });
        if (response.status === 200) {
          alert("Account created Successfully");
          console.log(response);
          router.push("/signin");
          return;
        } else {
          console.log(response);
          return;
        }
      } catch (error) {
        console.log(error);
        alert("Signup failed! Please try again or use a different email.");
        return;
      }
    }

    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      console.log(username);
      const response = await axios.post("http://localhost:3001/signin", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token",response.data.token)
        alert("Logged in");
        router.push("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl flex w-[900px] max-w-5xl overflow-hidden">
        {/* Left: Signup Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-blue-700">{mainHeading}</h1>
          <p className="text-gray-500 mb-6">{secondaryHeading}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {compo === "signup" && (
              <InputComponent
                type="email"
                text="Email Address"
                placeholder="Enter your email address"
                reference={emailRef}
              />
            )}
            {compo === "signup" && (
              <InputComponent
                type="text"
                text="name"
                placeholder="Enter your name"
                reference={nameRef}
              />
            )}
            <InputComponent
              type="text"
              text="username"
              placeholder="Enter username"
              reference={usernameRef}
            />
            <InputComponent
              type="password"
              text="Password"
              placeholder="Enter Password"
              reference={passwordRef}
            />
            {compo === "signup" && (
              <InputComponent
                type="password"
                text="Confirm Password"
                placeholder="Confirm Password"
                reference={repeatPasswordRef}
              />
            )}

            {compo === "signup" && <Button type="submit" text="Sign Up" />}
            {compo === "signin" && <Button type="submit" text="Sign In" />}
          </form>

          <p className="text-sm text-gray-500 mt-4">
            {downText + " "}
            {compo === "signup" && (
              <Link href="/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            )}
            {compo === "signin" && (
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            )}
          </p>
        </div>

        {/* Right: Image Section */}
        <div
          className="w-1/2 relative cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={SldeCover}
            alt="Signup visual"
            className="object-cover"
            fill
            priority
          />
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <h2 className="text-2xl font-bold">{imageText1}</h2>
            <p className="text-sm mt-2 max-w-sm">{imageText2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
