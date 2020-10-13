import React from "react";
import { VictoryBar, VictoryChart } from "victory";

const ChatBotBubbleBarChart = (props) => {
  return (
    <div className="piechart-area" style={{ width: 300, height: 300 }}>
      <VictoryChart>
        <VictoryBar
          data={props.data}
          width={150}
          height={150}
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          style={{
            labels: { fill: "black", fontSize: 4 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default ChatBotBubbleBarChart;
