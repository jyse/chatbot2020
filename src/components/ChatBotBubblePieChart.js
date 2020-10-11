import React from "react";
import chatbotIcon from "./chatbotIcon.png";
import { VictoryPie } from "victory";

const dateMessage = new Date().toLocaleString();

const ChatBotBubblePieChart = (props) => {
  console.log(props.piechart, "what is props goddammit");

  return (
    <VictoryPie
      data={props.piechart}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      style={{
        labels: { fill: "whiblack", fontSize: 10, fontWeight: "bold" },
        origin: { y: 50 },
      }}
    />
  );
};

export default ChatBotBubblePieChart;
