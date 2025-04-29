import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/appContext";
import { useAuth } from "@clerk/clerk-react";
const Header = () => {
  const { removeBg } = useContext(AppContext);
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-center max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* ----------Left side---------- */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br />
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background{" "}
          </span>
          from <br />
          images for free
        </h1>
        <p className="my-6 text-[15px] text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
          <br className="max-sm:hidden" />
          quibusdam? Beatae, molestias eos officiis nulla eum fuga vitae! Quam
          quidem nam mollitia
        </p>
        <div>
          <input
            type="file"
            accept="image/*"
            id="upload1"
            hidden
            onChange={(e) => removeBg(e.target.files[0])}
          />
          <label
            htmlFor="upload1"
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transaction-all duration-700"
          >
            <img src={assets.upload_btn_icon} width={20} />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>
      {/* ----------Right Side---------- */}
      <div>
        <img src={assets.header_img} className="w-full max-w-md" />
      </div>
    </div>
  );
};

export default Header;
