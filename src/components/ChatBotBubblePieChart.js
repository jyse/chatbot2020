import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const ChatBotBubblePieChart = (props) => {
  return (
    <VictoryPie
      data={props.userData}
      width={150}
      height={150}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      style={{
        labels: { fill: "black", fontSize: 4 },
      }}
      // labelComponent={<VictoryLabel dy={5} />}
    />
  );
};

export default ChatBotBubblePieChart;
