import React, { useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext } from "react";
import API from "../axios/axios";
import { SummaryAPI } from "../Api/SummaryAPI";
export const AppContext = createContext();
import { toast } from "react-toastify";
import { AxiosToastError } from "../error/AxiosToastError";
import { useNavigate } from "react-router-dom";

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const { getToken } = useAuth();
  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      console.log("TOKEN frontend", token);

      const response = await API({
        ...SummaryAPI.creditUser,
        withCredentials: true,
        headers: {
          token: token,
        },
      });
      console.log("Data", response.data);
      if (response.data.success) {
        setCredit(response.data.credits);
      }
    } catch (error) {
      console.log("Error auth :", error.message);
      toast.error(error.message);
    }
  };

  // saving the image given by the user
  const removeBg = async (image) => {
    try {
      console.log("Image", image);
      if (!isSignedIn) {
        return openSignIn();
      }

      //if signed in and uploaded the image then send the user to the result page
      setImage(image);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);

      console.log("Form data", formData);
      const response = await API({
        ...SummaryAPI.removeImageBg,
        data: formData,
        headers: {
          token,
        },
      });
      console.log("Image after bg remove", response);
      const { data: responseData } = response;

      if (responseData.success) {
        setResultImage(responseData.data.resultImage);
        responseData.data.creditBalance &&
          setCredit(responseData.data.creditBalance);
      } else {
        toast.error(responseData.message);
        responseData.data.creditBalance &&
          setCredit(responseData.data.creditBalance);
        if (responseData.data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
