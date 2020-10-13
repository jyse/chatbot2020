import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const ChatBotBubblePieChart = (props) => {
  console.log(props.userData, "what is in props userData?");

  let total = 0;
  props.userData.map((objectAnswer) => {
    total += objectAnswer.y;
  });

  props.userData.map((objectAnswer, index) => {
    const percentage = parseInt((objectAnswer.y / total) * 100) + "% ";
    const newKey = percentage + objectAnswer.x;

    if ((props.userData[index]["x"] = objectAnswer.x)) {
      props.userData[index]["x"] = newKey;
    }
  });

  return (
    <div className="piechart-area" style={{ width: 300, height: 300 }}>
      <VictoryPie
        data={props.userData}
        width={150}
        height={150}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        style={{
          labels: { fill: "black", fontSize: 4 },
        }}
      />
    </div>
  );
};

export default ChatBotBubblePieChart;
