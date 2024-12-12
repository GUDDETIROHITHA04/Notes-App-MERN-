import PropTypes from 'prop-types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{note.title}</h2>
      <p className="text-gray-600 text-lg">{note.description}</p>
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 text-white rounded mr-4"
          onClick={() => onEdit(note)}
        > 
          <EditNoteIcon />
        </button>
        <button
          className="bg-red-500 text-white rounded"
          onClick={() => deleteNote(note._id)}
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};
