import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  console.log(user);
  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/" className="cursor-pointer">
        <img src={assets.logo} className="w-32 sm:w-44" />
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="border px-4 py-2 sm:px-8 sm:py-3 flex rounded-full items-center justify-center bg-neutral-800 text-white gap-4 hover:bg-neutral-700 cursor-pointer"
        >
          Get Started
          <img src={assets.arrow_icon} className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
