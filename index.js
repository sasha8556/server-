let express = require("express");
let app = express();



app.listen(port, () => console.log("Server started"));

const pets = [
  { id: 1, name: "Archi", isMan: true, age: 0 },
  { id: 2, name: "Bublik", isMan: true, age: 5 },
  { id: 3, name: "Krosha", isMan: false, age: 3 },
  { id: 4, name: "Bimka", isMan: false, age: 12 },
];

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// console.log(process.env.SECRET_MESSAGE);
// console.log(process.env.TOKEN);



