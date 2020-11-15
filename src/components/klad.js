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

// setting for the past 24 hours
// new Date(Date.now() - 24 * 60 * 60 * 1000))

//
//   let test = createVisualDailyData(dailyMessages);
//   console.log(test, "what is test hier?");
//   setVisualDailyData(createVisualDailyData(dailyMessages));
//   setVisualDailySalesData(createVisualDailyData(dailyMessages));

//   useEffect(() => {
//     if (dailyMessages.length !== 0) {
//       dailyMessages.map((message) => {
//         console.log(message, "what is message here? in this useEffect");
//       });
//     }
//   }, [dailyMessages]);

/*useEffect(() => {
    if (user) {
      db.collection("users").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          let data = doc.data();
          if (data.userId === user.uid) {
            let userDocId = doc.id;
            setUserDocId(userDocId);
          }
        });
      });
    }
  }, [user]);*/

// colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
// width={200}
// height={200}
// data=
// {[
//   { x: "Cats", y: 35 },
//   { x: "Dogs", y: 40 },
//   { x: "Birds", y: 55 },
//   { x: "Dino's", y: 20 },
// ]}
// />
