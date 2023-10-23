// Load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
} 

// Imports
const express = require("express");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const cors = require("cors");

// Create an express App
const app = express();

// configure express to read json and use cors
app.use(express.json());
app.use(cors());

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