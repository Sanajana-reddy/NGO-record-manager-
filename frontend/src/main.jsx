import React from "react";
import ReactDOM from "react-dom/client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="447326230913-177b8m0lsf30f04m4lc04c6n0dq58g8i.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);