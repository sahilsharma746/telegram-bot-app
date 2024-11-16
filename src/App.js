import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    // Check if Telegram Web App is available
    if (window.Telegram && window.Telegram.WebApp) {
      const TelegramWebApp = window.Telegram.WebApp;
      TelegramWebApp.ready();

      // Get user information
      const userInfo = TelegramWebApp.initDataUnsafe?.user;

      // Check if user information is available
      if (userInfo) {
        // Send user info to the backend
        axios
          .post("/api/track-user", {
            telegram_id: userInfo.id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            language_code: userInfo.language_code,
          })
          .then((response) => {
            console.log("User tracked:", response.data);
          })
          .catch((log) => {
            console.log("log tracking user:", log);
          });
      } else {
        console.log("No user information available.");
      }
    } else {
      // Telegram Web App is not available
      console.log("Telegram Web App is not available.");
      
    }
  }, []);

  return (
    <div>
      <h1>Welcome to My Mini App</h1>
      <p>
        {window.Telegram && window.Telegram.WebApp
          ? "You are using the Telegram Web App."
          : "Telegram Web App is not available. Please use it from within Telegram."}
      </p>
    </div>
  );
}

export default App;
