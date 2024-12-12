import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NoteModal } from "../components/NoteModal";
import axios from "axios";
import { NoteCard } from "../components/NoteCard";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filterNotes,setFilterNotes] = useState([])
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query,setQuery] = useState('')

  useEffect(() => {
    fetchNotes();
  }, []);
  useEffect(() => {
    setFilterNotes(
      notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()) || note.description.toLowerCase().includes(query.toLowerCase())
    )
    )
  }, [query,notes]);
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/note', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModelOpen(false);
    setCurrentNote(null); // Reset currentNote to avoid editing old note after closing modal
  };

  const onEdit = (note) => {
    setCurrentNote(note); // Set the selected note to edit
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note added successfully",{
          className: 'max-w-sm text-sm'})
        fetchNotes(); // Reload the notes after adding
        closeModal();
      }
    } catch (error) {
      console.error('Add Note Error:', error.response?.data || error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note deleted successfully",{
          className: 'max-w-sm text-sm'})
        fetchNotes(); // Reload the notes after deletion
      }
    } catch (error) {
      console.error('Delete Note Error:', error.response?.data || error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Note edited successfully",{
          className: 'max-w-sm text-sm'})
        fetchNotes(); // Reload the notes after editing
        closeModal();
      }
    } catch (error) {
      console.error('Edit Note Error:', error.response?.data || error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery}/>
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {filterNotes.length > 0 ? filterNotes.map((note) => (
          <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
        )) : <p>No Notes</p>}
      </div>

      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 text-3xl font-bold bg-slate-600 hover:bg-teal-950 text-white p-4 rounded-full"
      >
        +
      </button>

      {isModelOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default Home;
