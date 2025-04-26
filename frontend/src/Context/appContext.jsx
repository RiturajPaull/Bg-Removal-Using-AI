import React, { useState } from "react";

import { useAuth } from "@clerk/clerk-react";
import { createContext } from "react";
import axios from "axios";
import API from "../axios/axios";
import { SummaryAPI } from "../Api/SummaryAPI";
export const AppContext = createContext();
import { toast } from "react-toastify";

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      console.log("TOKEN frontend", token);
      // const response = await axios.get(backendUrl + "/api/user/credits", {
      //   withCredentials: true,
      //   headers: {
      //     token: token,
      //   },
      // });
      const response = await API({
        ...SummaryAPI.creditUser,
        withCredentials: true,
        headers: {
          token: token,
        },
      });
      console.log("Response", response);

      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log("Error auth :", error);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
