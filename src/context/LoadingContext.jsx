import {
  createContext,
  useContext,
  useState,
} from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({
  children,
}) => {

  const [loading, setLoading] =
    useState(false);

  /*
  =========================================
  START LOADING
  =========================================
  */

  const startLoading = () => {

    setLoading(true);

  };

  /*
  =========================================
  STOP LOADING
  =========================================
  */

  const stopLoading = () => {

    setLoading(false);

  };

  /*
  =========================================
  TOGGLE LOADING
  =========================================
  */

  const toggleLoading = () => {

    setLoading((prev) => !prev);

  };

  return (

    <LoadingContext.Provider
      value={{

        loading,

        setLoading,

        startLoading,

        stopLoading,

        toggleLoading,

      }}
    >

      {children}

    </LoadingContext.Provider>

  );

};