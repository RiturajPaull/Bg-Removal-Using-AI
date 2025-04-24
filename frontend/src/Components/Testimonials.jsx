import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div>
      {/* Title */}
      <h1 className="mb-12 sm:mb-20 bg-gradient-to-r from-gray-900 to-gray-400 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-clip-text text-transparent">
        Customer Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((item, index) => (
          <div
            className="hover:scale-105 transition-all duration-150 bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto"
            key={index}
          >
            <p className="text-4xl text-gray-500">❞</p>
            <p className="text-sm text-gray-500">{item.text}</p>
            <div className="flex items-center gap-2 mt-5 ">
              <img src={item.image} className="rounded-full w-10 h-10" />
              <div>
                <p className="text-medium">{item.author}</p>
                <p className="text-sm text-gray-600">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
