const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
    res.send("Hello hello hello");
});

app.use("/Bye", (req, res) => {
    res.send("Bye from the server");
});


app.listen(3001, () => {
    console.log("Server is running on port 3001....");
});