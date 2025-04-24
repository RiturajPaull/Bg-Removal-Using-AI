import React from "react";
import { assets } from "../assets/assets";
const Upload = () => {
  return (
    <div className="pb-16">
      <h1 className="mt-50 mb-15 text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-neutral-700 to-neutral-400 bg-clip-text  text-transparent text-center">
        See the magic. Try Now
      </h1>
      <div className="mb-24 text-center">
        <input type="file" name="" id="upload2" hidden />
        <label
          htmlFor="upload2"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transaction-all duration-700"
        >
          <img src={assets.upload_btn_icon} width={20} />
          <p className="text-white text-sm">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
