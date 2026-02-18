require("dotenv").config();//importing fdot env and using to config()to initialize it
const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("./dbConfig"); //importing the database config file to the server file

const server = new express();
server.use(cors());
server.use(express.json());
server.use('/Uploads',express.static('./Uploads'))
server.use(router);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
