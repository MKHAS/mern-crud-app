import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  // State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  // Use Effect
  useEffect(() => {
    fetchNotes();
  }, [])


  // Functions
  const fetchNotes = async () => {
    // fetch notes
    const res = await axios.get('http://localhost:3000/notes');
    // set to state
    setNotes(res.data.notes);
    console.log(res);
  };

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;

    setCreateForm({
      ...createForm, // this creates a duplicate of the createForm object
      [name]: value
    })

  };

  const createNote = async (e) => {
    e.preventDefault(); //prevent the page from refreshing when we submit form

    //create the note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    //update state
    setNotes([...notes, res.data.note]);

    // clear form state
    setCreateForm({ title: "", body: ""});

  };

  const deleteNote = async (_id) => {
    //delete note 
    const res = await axios.delete(`http://localhost:3000/notes/${_id}` );
    console.log(res);
    //update state
    const newNotes = [...notes].filter(note => {
      return note._id !== _id;
    });

    setNotes(newNotes);
  }

  return (
    <div className="App">
      <div>
        <h2>Notes: </h2>
        {notes &&
         notes.map((note) => {
          return (
            <div key={note._id} >
              <h3>{note.title}</h3>
              
              <button onClick={() => { deleteNote(note._id)}}>Delete Note</button>
            </div>);
        })}
      </div>

      <div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <input
           onChange={updateCreateFormField}
           value={createForm.title}
           name="title"
           />
          <textarea 
          onChange={updateCreateFormField} 
          value={createForm.body} 
          name="body"
          />
          <button type="submit"> Create Note </button>
        </form>
      </div>
    </div>
  );
}

export default App;
