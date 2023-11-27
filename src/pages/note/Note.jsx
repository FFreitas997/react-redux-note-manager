import style from './style.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../store";
import NoteForm from "../../components/note-form/NoteForm";
import {useState} from "react";
import {NoteApi} from "../../api/note-api";
import {deleteNote, updateNote} from "../../store/notes/notes-slice";
import {withAuthRequired} from "../../hoc/withAuthRequired";

function Note() {
    const [isEditable, setIsEditable] = useState(false)
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const note = useSelector(store => store.noteSlice.noteList.find(e => e.id === id))

    const onSubmit = async (formValues) => {
        const result = await NoteApi.updateByID(id, formValues);
        dispatch(updateNote(result))
        setIsEditable(false)
    }

    const deleteNote_ = async () => {
        if (window.confirm("Are you sure you want to delete a note ?")) {
            await NoteApi.deleteByID(note.id)
            dispatch(deleteNote(note))
            navigate("/")
        }
    }

    return (
        <div>
            {
                note && <NoteForm isEditable={false}
                                  title={isEditable ? "Edit Note" : note.title}
                                  note={note}
                                  onClickEdit={() => setIsEditable(!isEditable)}
                                  onClickTrash={deleteNote_}
                                  onSubmit={isEditable && onSubmit}
                />
            }
        </div>
    )
}

export default Note;