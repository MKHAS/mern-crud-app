// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
} 

// Imports
const express = require("express");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");

// Create an express App
const app = express();

// configure express to read json
app.use(express.json());

// Connect to Database
connectToDb();

//Routing

//Retreive all the notes
app.get('/notes', notesController.fetchNotes);

// Retrieve a note by id
app.get('/notes/:id', notesController.fetchNote); 

// Create a new note
app.post("/notes", notesController.createNote);

// Update a note
app.put("/notes/:id", notesController.updateNote);

// Delete a note
app.delete("/notes/:id", notesController.deleteNote);


//Start our server
app.listen(process.env.PORT);