const express = require("express");
const app = express();
const port = 3030;
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());

const auth = require("./routes/auth/auth.route");
app.use("/api/user/auth", auth);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
