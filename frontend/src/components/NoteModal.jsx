import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NoteModal = ({ closeModal, addNote, currentNote,editNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setDescription(currentNote.description);
        }
    }, [currentNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote){
            editNote(currentNote._id,title,description)
        }
        else{
        addNote(title, description);
    };
}
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md mb-4 w-80">
                <h2 className="text-2xl font-bold mb-4">
                    {currentNote ? "Edit Note" : "Add New Note"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-900">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border text-sm"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-900">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border text-sm"
                            placeholder="Note description"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-xl text-white p-2 rounded"
                    >
                        {currentNote ? "Update Note" : "Add Note"}
                    </button>
                    <br />
                    <Link to="/" className="text-red-500 text-xl p-2" onClick={closeModal}>
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );

}
NoteModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    currentNote: PropTypes.func.isRequired,// `object` type and optional for add flow
    editNote: PropTypes.func.isRequired // Required because it's always passed
};

