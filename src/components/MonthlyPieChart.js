import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { db } from "../firebase";

const MonthlyPieChart = (props) => {
  const [monthlyData, setVisualMonthlyData] = useState([]);
  const [monthlySalesData, setVisualMonthlySalesData] = useState([]);
  const { userId } = props;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      let monthlyMessages = [];
      const messagesSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .where(
          "timestamp",
          ">",
          new Date(Date.now() - 24 * 30 * 60 * 60 * 1000)
        )
        .get();

      messagesSnapshot.forEach((snap) => {
        const data = snap.data();
        monthlyMessages.push(data);
      });

      let monthlyData = createVisualMonthlyData(monthlyMessages);
      let monthlySalesData = createVisualMonthlySalesData(monthlyMessages);

      setVisualMonthlyData(monthlyData);
      setVisualMonthlySalesData(monthlySalesData);
    })();
  }, [userId]);

  const createVisualMonthlyData = (monthlyMessages) => {
    let monthlyDataArray = [];

    monthlyMessages.map((message) => {
      if (message.key !== "revenue") {
        monthlyDataArray.push({
          x: message.key,
          y: parseInt(message.answer),
        });
      }
    });

    return makeData(monthlyDataArray, "clients");
  };

  const createVisualMonthlySalesData = (monthlyMessages) => {
    let monthlySalesDataArray = [];

    monthlyMessages.map((message) => {
      if (message.key == "revenue") {
        monthlySalesDataArray.push({
          x: message.key,
          y: parseInt(message.answer),
        });
      }
    });

    return makeData(monthlySalesDataArray, "money");
  };

  const makeData = (data, label) => {
    let madeData = data.reduce((acc, { x, y }) => {
      if (!Reflect.has(acc, x)) acc[x] = 0;

      let count = parseInt(y);

      if (Number.isInteger(count)) {
        acc[x] += y;
      }
      return acc;
    }, {});

    let visualUserData = Object.entries(madeData).map(([key, count]) => ({
      x: count + " " + key,
      y: count,
    }));
    return visualUserData;
  };

  return (
    <div className="piechart-area" style={{ width: 350, height: 350 }}>
      <VictoryPie
        data={monthlyData}
        width={275}
        height={275}
        colorScale={["tomato", "orange", "gold", "cyan", "navy", "lightgreen"]}
        style={{
          labels: { fill: "black", fontSize: 11 },
        }}
      />
    </div>
  );
};

export default MonthlyPieChart;
