import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const MonthlyClientPieChart = (props) => {
  return (
    <div className="piechart-area" style={{ width: 350, height: 350 }}>
      <VictoryPie
        width={150}
        height={150}
        data={[
          { x: "monthlyClient1", y: 35 },
          { x: "monthlyClient1", y: 40 },
          { x: "monthlyClient1", y: 55 },
        ]}
      />
    </div>
  );
};

export default MonthlyClientPieChart;
