let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");
require("dotenv").config();
const fs = require("fs");
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://2102eaea1d65d9623a0cef4b9169963d@o4506129094410240.ingest.sentry.io/4506138612400128",
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

const port = process.env.PORT;

app.listen(port, () => console.log("Served started "));
