import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState(""); // Add a new state for the username
  const [token, setToken] = useState(null);

  const [latestBooking, setLatestBooking] = useState(null);

  const handleLogout = () => {
    // Clear the token when the user logs out
    setToken(null);
    setUsername("");
    setLoginStatus(false);
    setLatestBooking(null);
    // You can also clear the token from AsyncStorage for persistent storage.
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        username,
        setUsername,
        token,
        setToken,
        latestBooking,
        setLatestBooking,
      }} // Include the new state and setter
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
