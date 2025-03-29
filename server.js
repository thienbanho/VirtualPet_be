require("dotenv").config();
const express = require("express");
const app = express();
const initializeFirebase = require("./controller/lib/firebase");

app.use(express.json());
initializeFirebase();   


app.get("/", (req, res) => {
  res.json({ "Hello World!": "Welcome to the Node.js World!" });
});

app.listen(process.env.PORT, () => {
  if (error) console.error("Error starting server", error.stack);
  console.log("Server is running on http://localhost:3001");
});
