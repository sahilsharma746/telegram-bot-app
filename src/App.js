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
          .catch((error) => {
            console.error("Error tracking user:", error);
          });
      }
    } else {
      console.error("Telegram Web App is not available.");
    }
  }, []);

  return (
    <div>
      <h1>Welcome to My Mini App</h1>
    </div>
  );
}

export default App;
