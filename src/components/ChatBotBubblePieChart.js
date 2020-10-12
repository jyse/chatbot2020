import React from "react";
import { VictoryPie } from "victory";

const ChatBotBubblePieChart = (props) => {
  Object.keys(props).map((object) => {
    console.log(object, "print object");
  });
  console.log(props.userData, "what is in userData here?");

  const test = props.userData;
  console.log(test, "what is in test");
  console.log(
    <VictoryPie
      data={[
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 },
      ]}
    />
  );
  console.log(
    <VictoryPie
      width={50}
      height={50}
      data={props.userData}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      style={{
        labels: { fill: "whiblack", fontSize: 10, fontWeight: "bold" },
        origin: { y: 50 },
      }}
    />
  );

  return (
    <VictoryPie
      data={props.userData}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      style={{
        labels: { fill: "whiblack", fontSize: 10, fontWeight: "bold" },
        origin: { y: 50 },
      }}
    />
  );
};

export default ChatBotBubblePieChart;
