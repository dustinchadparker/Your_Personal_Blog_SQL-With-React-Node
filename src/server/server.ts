import * as path from "path";
import * as express from "express";
import apiRouter from "./routes";

var bodyParser = require("body-parser");

const app = express();
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

let p = path.join(__dirname, "../public");
console.log(p);

app.use(express.static(p));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
