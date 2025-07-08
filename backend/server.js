const express = require("express");
const cors = require("cors");
const http = require("http");
const emailRoutes = require("./routes/email");
const { initSocket } = require("./socket");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

initSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
