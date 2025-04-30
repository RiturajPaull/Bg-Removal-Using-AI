import React, { useContext, useState } from "react";
import { assets, plans } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appContext";
import { useAuth } from "@clerk/clerk-react";
import { AxiosToastError } from "../error/AxiosToastError";
import API from "../axios/axios";
import { SummaryAPI } from "../Api/SummaryAPI";

const BuyCredit = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const { loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const initPay = async (order) => {
    console.log("Inside initpay");
    const options = {
      key: import.meta.env.VITE_RAZOYPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Razor Pay", response);
      },
    };

    const rzPay = new window.Razorpay(options);
    rzPay.open();
  };

  const paymentRazorPay = async (planId) => {
    try {
      const token = await getToken();
      console.log("Token", token);
      const response = await API({
        ...SummaryAPI.razorpay_payment,
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        data: {
          planId: planId,
        },
      });
      console.log("Payment response", response);
      const { data: responseData } = response;
      if (responseData.success) {
        initPay(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="text-sm px-10 border border-gray-300 py-3 rounded-full mb-3 ">
        Our Plans
      </button>
      <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 text-2xl bg-clip-text text-transparent font-semibold mb-6">
        Choose the plan that's right for you
      </h1>
      <div className="flex items-center justify-center gap-7 max-sm:grid max-md:grid text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className=" bg-white drop-shadow-md rounded px-10 py-10 mt-6 flex-col cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={assets.logo_icon} width={30} className="mb-4" />

            <p className="font-semibold mb-3">{item.id}</p>
            <p className="mb-3">{item.desc}</p>
            <p>
              <span className="text-2xl">₹{item.price}</span>/{item.credits}{" "}
              credits
            </p>

            <button
              onClick={() => paymentRazorPay(item.id)}
              className="mt-10 border w-full px-10 py-2 rounded bg-gray-800 text-white hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {loggedIn ? "Get Started" : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
