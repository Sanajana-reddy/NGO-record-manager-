import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import App from "./App";

import { MantineProvider } from "@mantine/core";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(

  <MantineProvider withGlobalStyles withNormalizeCSS>

    <GoogleOAuthProvider
      clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID
      }
    >

      <App />

    </GoogleOAuthProvider>

  </MantineProvider>
);
