import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

const MonthlySalesPieChart = (props) => {
  return (
    <div className="piechart-area" style={{ width: 350, height: 350 }}>
      <VictoryPie
        width={150}
        height={150}
        data={[
          { x: "monthlySales1", y: 35 },
          { x: "monthlySales1", y: 40 },
          { x: "monthlySales1", y: 55 },
        ]}
      />
    </div>
  );
};

export default MonthlySalesPieChart;
