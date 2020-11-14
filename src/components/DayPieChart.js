import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
import { db } from "../firebase";

const DayPieChart = (props) => {
  const [userDocId, setUserDocId] = useState(props.userDocId);
  const [dailyMessages, setDailyMessages] = useState([]);
  const [dailyData, setVisualDailyData] = useState([]);
  const { userId } = props;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      let dailyMessages = [];

      const messagesSnapshot = await db
        .collection("users")
        .doc(userId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .where("timestamp", ">", new Date(Date.now() - 24 * 60 * 60 * 1000))
        .get();

      messagesSnapshot.forEach((snap) => {
        const data = doc.data();
        dailyMessages.push(data);
      });

      console.log({ messagesSnapshot, dailyMessages });
      createVisualDailyData(dailyMessages);
    })();

    /*
      .where("timestamp", ">", Date.now() - 24 * 60 * 60 * 1000)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          let twentyFourHrsAgo = Date.now() - 24 * 60 * 60 * 1000;

          if (
            doc.data().timestamp &&
            doc.data().timestamp.seconds > twentyFourHrsAgo
          ) {
          //   console.log(doc.data(), "what is in data()");
          //   console.log(doc.data().timestamp, "what is in data()");
          //   console.log(doc.data().timestamp.seconds, "what is in data()");
          //   dailyMessages.push(doc.data());
          // }
          console.log(dailyMessages, "what is in dailyMessages");
          createVisualDailyData(dailyMessages);
        });
          });*/
  }, [userId]);

  const createVisualDailyData = (messages) => {
    messages.map((message) => {
      //   console.log(message, "each message given to createVisualDataDaily");
      //   setVisualDailyData(dailyData)
    });
  };

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
  // 24 * 60 * 60 * 1000
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

// => {
// //   if (doc.data().timestamp >   ate(Date.now() - 24 * 60 * 60 * 1000)) {
//     console.log(doc.data(), "messages of the pas 24 hours");
// setDailyMessages(doc.data());
//   }
// });
//   });

//   console.log(doc.data().timestamp.seconds, "what is seconds");
// console.log(twentyFourHrsAgo, "24hours ago ");
// if (doc.data().timestamp?.seconds > twentyFourHrsAgo) {
//   console.log(doc.data());
//   return doc.data();
// }
