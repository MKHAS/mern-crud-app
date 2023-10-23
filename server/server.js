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

//Retreive all the notes
app.get('/notes', async (req, res) => {
    // Fine Notes
    const notes = await Note.find();
    // Respond with them
    res.json({ notes: notes });
});

// Retrieve a note by id
app.get('/notes/:id', async (req, res) => {
    //get id off the url
    const noteId = req.params.id;

    //find note using the id
    const note = await Note.findById(noteId);
    
    //respond with the note
    res.json({note: note});
}); 

// Create a new note
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

// Update a note
app.put("/notes/:id", async (req, res) => {
    const noteId = req.params.id;

    //get the data off the req body and update
    const title = req.body.title;
    const body = req.body.body;

    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    })

    //fetch updated note
    const note = await Note.findById(noteId);

    res.json({ note: note });
})


//Start our server
app.listen(process.env.PORT);