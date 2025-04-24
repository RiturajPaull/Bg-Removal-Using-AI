import React from "react";
import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1 className="bg-gradient-to-r from-gray-900 to-gray-400 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-clip-text text-transparent">
        Steps to remove background <br /> image in seconds
      </h1>
      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center ">
        <div className="flex items-start gap-4 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img src={assets.upload_icon} className="max-w-9" />
          <div>
            <p className="text-xl font-medium mb-1">Upload Image</p>
            <p className="text-sm text-neutral-500">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img src={assets.upload_icon} className="max-w-9" />
          <div>
            <p className="text-xl font-medium mb-1">Remove Background</p>
            <p className="text-sm text-neutral-500">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img src={assets.upload_icon} className="max-w-9" />
          <div>
            <p className="text-xl font-medium mb-1">Download Image</p>
            <p className="text-sm text-neutral-500">
              This is a demo text, will replace it later.
              <br /> This is a demo..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
