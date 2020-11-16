import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { db } from "../firebase";

const DayPieChart = (props) => {
  const [userDocId, setUserDocId] = useState(props.userDocId);
  const [dailyMessages, setDailyMessages] = useState([]);
  const [dailyData, setVisualDailyData] = useState([]);
  const [dailySalesData, setVisualDailySalesData] = useState([]);
  const { userId } = props;

  useEffect(() => {
    let now = new Date();
    let startOfDay = now.setHours(0, 0, 0, 0);
    let newStart = new Date(startOfDay);

    if (!userId) return;
    (async () => {
      let dailyMessages = [];
      // now set on 1 hour

      const messagesSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .where("timestamp", ">", newStart)
        .get();

      messagesSnapshot.forEach((snap) => {
        const data = snap.data();
        dailyMessages.push(data);
      });

      let dailyData = createVisualDailyData(dailyMessages);
      let dailySalesData = createVisualDailySalesData(dailyMessages);

      setVisualDailyData(dailyData);
      setVisualDailySalesData(dailySalesData);
    })();
  }, [userId]);

  const createVisualDailyData = (dailyMessages) => {
    let dailyDataArray = [];

    dailyMessages.map((message) => {
      if (message.key !== "revenue") {
        dailyDataArray.push({
          x: message.key,
          y: parseInt(message.answer),
        });
      }
    });

    return makeData(dailyDataArray, "clients");
  };

  const createVisualDailySalesData = (dailyMessages) => {
    let dailySalesDataArray = [];

    dailyMessages.map((message) => {
      if (message.key == "revenue") {
        dailySalesDataArray.push({
          x: message.key,
          y: parseInt(message.answer),
        });
      }
    });

    return makeData(dailySalesDataArray, "money");
  };

  const makeData = (data) => {
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
        data={dailyData}
        width={180}
        height={180}
        colorScale={["tomato", "orange", "gold", "cyan", "navy", "lightgreen"]}
        style={{
          labels: { fill: "black", fontSize: 6 },
        }}
      />
    </div>
  );
};

export default DayPieChart;
