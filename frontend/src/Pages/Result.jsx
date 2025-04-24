import React, { useState } from "react";
import { assets } from "../assets/assets";

const Result = () => {
  const [imageLoader, setImageLoader] = useState(false);
  return (
    <div className="min-h-[75vh] mx-4 my-3 lg:mx-44 mt-14">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-md">
        {/* Image Container */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* Left side */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border border-gray-400"
              src={assets.image_w_bg}
              width={500}
            />
          </div>
          {/* Right Side */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {/* loader */}
              {imageLoader ? (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              ) : (
                <img src={assets.image_wo_bg} width={500} />
              )}
            </div>
          </div>
        </div>
        {/* -----Button----- */}
        <div className="flex justify-center item-center sm:justify-end gap-4 mt-7">
          <button className="border rounded-full px-8 py-3 text-violet-600 text-sm border-violet-600 cursor-pointer hover:scale-105 transition-all duration-700">
            Try another image
          </button>
          <a className=" flex items-center justify-center px-8 py-3 rounded-full text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:scale-105 transition-all duration-700">
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
