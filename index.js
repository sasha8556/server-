let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");
require("dotenv").config();
const fs = require("fs");
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://f3a44e95445e5cd47539acc7c2c12a0f@o4506129094410240.ingest.sentry.io/4506169133498368",
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

const port = process.env.PORT;

app.listen(port, () => console.log("Served started "));
