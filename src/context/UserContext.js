import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export function UserProvider({ children }) {
  const token = localStorage.getItem("authToken");
  const [userData, setUserData] = useState(null);
  const [demoMode, setDemoMode] = useState(false);

  const login = (userData) => {
    setUserData(userData);
  };

  const logout = () => {
    setUserData(null);
  };

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "get/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setUserData(response.data.user);
        setDemoMode(
          response.data.user.demo === "false" ||
            response.data.user.demo === false
            ? false
            : true
        );
      })
      .catch((error) => {
        console.error("Error calling api:", error);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
        demoMode,
      }}
    >
      {children}
    </Context.Provider>
  );
}

/*





import React, { createContext, useState } from "react";

export const Context = createContext();

export function Provider({ children }) {
  const [debug, setDebug] = useState(true);
  const [lang, setLang] = useState("en");
  const [firstRoute, setFirstRoute] = useState(true);
  const [rendered, setRendered] = useState(false);

  const linkedin = "https://www.linkedin.com";
  const github = "https://github.com/davidebalice";

  if (debug) {
    console.log(lang);
  }

  return (
    <Context.Provider
      value={{
        debug,
        setDebug,
        lang,
        setLang,
        rendered,
        setRendered,
        firstRoute,
        setFirstRoute,
        linkedin,
        github,
      }}
    >
      {children}
    </Context.Provider>
  );
}
*/
