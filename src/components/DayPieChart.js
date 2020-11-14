import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";

const DayPieChart = (props) => {
  const [userDocId, setUserDocId] = useState(props.userDocId);
  const [dailyMessages, setDailyMessages] = useState([]);

  useEffect(() => {
    if (userDocId) {
      db.collection("users")
        .doc(userDocId)
        .collection("messages")
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().timestamp > Date(Date.now() - 24 * 60 * 60 * 1000)) {
              console.log(doc.data());
              setDailyMessages(doc.data());
            }
          });
        });
    }
    console.log(dailyMessages, "dailyMessages");
  }, [userDocId]);

  return (
    <div className="piechart-area" style={{ width: 350, height: 350 }}>
      <p>PieChart Baby</p>
      {/* <VictoryPie
        data={0}
        width={150}
        height={150}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        style={{
          labels: { fill: "black", fontSize: 4 },
        }}
      /> */}
    </div>
  );
};

export default DayPieChart;

{
  /* <VictoryPie
colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
width={250}
height={250}
data={[
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
    { x: "Dino's", y: 20 },
]}
/> */
}
//   let total = 0;
//   props.userData.map((objectAnswer) => {
//     total += objectAnswer.y;
//   });

//   props.userData.map((objectAnswer, index) => {
//     const percentage = parseInt((objectAnswer.y / total) * 100) + "% ";
//     const newKey = percentage + objectAnswer.x;

//     if ((props.userData[index]["x"] = objectAnswer.x)) {
//       props.userData[index]["x"] = newKey;
//     }
//   });
