import React from "react";
import UserDashboard from "../../components/UserDashboardGrid";
import ChatBotButton from "../../components/ChatBotButton";

function Dashboard() {
  return (
    <div>
      <UserDashboard />
      <ChatBotButton show={showChatbot} />
    </div>
  );
}

export default Dashboard;
