// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
} 

// Imports
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require('./models/note');

// Create an express App
const app = express();

// configure express to read json
app.use(express.json());

// Connect to Database
connectToDb();

//Routing
app.get('/', (req, res) => {
    res.json({ hello: "world" });
});

app.get('/notes', (req, res) => {
    // Fine Notes
    // Respond with them
})

app.post("/notes", async (req, res) => {
    //get the sent in data off the request body
    const title = req.body.title;
    const body = req.body.body;
    //use it to create a note
    const note = await Note.create({
        title: title,
        body: body
    })
    //then send note as res
    res.json({note: note})
});



//Start our server
app.listen(process.env.PORT);