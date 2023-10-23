const Note = require('../models/note')

const fetchNotes = async (req, res) => {
    // Fine Notes
    const notes = await Note.find();
    // Respond with them
    res.json({ notes });
}

const fetchNote = async (req, res) => {
    //get id off the url
    const noteId = req.params.id;

    //find note using the id
    const note = await Note.findById(noteId);
    
    //respond with the note
    res.json({ note });
}

const createNote = async (req, res) => {
    //get the sent in data off the request body
    const { title, body } = req.body;
    //use it to create a note
    const note = await Note.create({
        title,
        body
    })
    //then send note as res
    res.json({ note })
}

const updateNote = async (req, res) => {
    const noteId = req.params.id;

    //get the data off the req body and update
    const {title, body} = req.body;

    await Note.findByIdAndUpdate(noteId, {
        title,
        body
    })

    //fetch updated note
    const note = await Note.findById(noteId);

    res.json({ note });
}

const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    await Note.deleteOne({ _id: noteId });

    res.json({success: "Record Deleted"})
}

module.exports = {
    fetchNote,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote
}