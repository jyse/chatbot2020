import React, { useState, useEffect } from "react";
import "./KanbanCards.css";
import { db } from "../firebase";

function KanbanCards(props) {
  const [dailyData, setVisualDailyData] = useState([]);
  const { userId } = props;
  useEffect(() => {
    let now = new Date();
    let startOfDay = now.setHours(0, 0, 0, 0);
    let newStart = new Date(startOfDay);

    if (!userId) return;
    (async () => {
      let dailyMessages = [];
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

      setVisualDailyData(dailyData);
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
      x: key,
      y: count,
    }));
    return visualUserData;
  };

  const BACKGROUND_COLORS = {
    "potential clients": {
      color: "#F0AB3A",
    },
    calls: {
      color: "#9AC2C5",
    },
    appointments: {
      color: "#CDE7BE",
    },
    pitches: {
      color: "#AA7DCE",
    },
    sales: {
      color: "#7E7F9A",
    },
  };

  const dailyDataStandard = [
    { x: "Potential clients", y: 0, color: "#F0AB3A" },
    { x: "Calls", y: 0, color: "#9AC2C5" },
    { x: "Appointments", y: 0, color: "#CDE7BE" },
    { x: "Pitches", y: 0, color: "#AA7DCE" },
    { x: "Sales", y: 0, color: "#7E7F9A" },
  ];
  return (
    <div className="main-overview">
      {dailyData.length == 0
        ? dailyDataStandard.map((card, key) => (
            <div
              className="overviewcard"
              key={key}
              style={{ backgroundColor: card.color }}
            >
              <div className="overviewcard__icon">
                <h1>{card.x}</h1>
              </div>
              <div className="overviewcard__info">
                <h1>0</h1>
              </div>
            </div>
          ))
        : dailyData.map((card, key) => (
            <div
              className="overviewcard"
              key={key}
              style={{
                backgroundColor: BACKGROUND_COLORS[card.x].color,
              }}
            >
              <div className="overviewcard__icon">
                <h1>{card.x}</h1>
              </div>
              <div className="overviewcard__info">
                <h1>{card.y}</h1>
              </div>
            </div>
          ))}
    </div>
  );
}

export default KanbanCards;
