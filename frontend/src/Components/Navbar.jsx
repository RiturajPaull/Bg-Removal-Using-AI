import React, { useEffect, useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../Context/appContext";
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, setCredit, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("User", user);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);
  console.log("Credits", credit);
  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/" className="cursor-pointer">
        <img src={assets.logo} className="w-32 sm:w-44" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-5">
          <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-4 sm:py-2.5 py-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-700">
            <img src={assets.credit_icon} className="w-8" />
            <p className="font-semibold text-neutral-500 text-sm">
              Credits : {credit}
            </p>
          </button>
          <button className="flex items-center gap-2 bg-yellow-100 px-4 sm:px-4 sm:py-2.5 py-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-700">
            <img src={assets.credit_icon} className="w-8" />
            <p
              onClick={() => navigate("/buy")}
              className="font-semibold text-neutral-500 text-sm"
            >
              Buy Credits
            </p>
          </button>
          <p className="font-semibold text-medium text-neutral-500 max-sm:hidden">
            Hi, {user.fullName}
          </p>
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
