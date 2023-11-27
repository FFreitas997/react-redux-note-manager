import style from './style.module.css'
import NoteForm from "../../components/note-form/NoteForm";
import {NoteApi} from "../../api/note-api";
import {useDispatch} from "react-redux";
import {addNote} from "../../store/notes/notes-slice";
import {useNavigate} from "react-router-dom";
import {withAuthRequired} from "../../hoc/withAuthRequired";
import Note from "../note/Note";

function NoteCreate(params) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (formSubmit) => {
        const createdNote = await NoteApi.create({...formSubmit, created_at: new Date().toLocaleDateString()})
        dispatch(addNote(createdNote))
        navigate("/")
    }

    return (
        <div>
            <NoteForm title={"New Note"} onSubmit={submit}/>
        </div>
    )
}

export default NoteCreate;
export const ProtectedNoteCreate = withAuthRequired(NoteCreate)