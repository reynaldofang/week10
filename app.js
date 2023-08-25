const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/authRoutes");
const transferRoutes = require("./routes/transferRoutes");
const databaseMiddleware = require("./db");

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use(databaseMiddleware);

app.use("/", userRouter);
app.use("/transfers", transferRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
