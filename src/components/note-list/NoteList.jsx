import style from './style.module.css'
import {useDispatch, useSelector} from "react-redux";
import TextCard from "../text-card/TextCard";
import {useNavigate} from "react-router-dom";
import {NoteApi} from "../../api/note-api";
import {deleteNote} from "../../store/notes/notes-slice";

function NoteList(params) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const deleteNote_ = async (note) => {
        if (window.confirm("Are you sure you want to delete a note ?")) {
            await NoteApi.deleteByID(note.id)
            dispatch(deleteNote(note))
        }
    }

    return (
        <div className={"row justify-content-center"}>
            {
                params.list.map((note) => (
                    <div className={style.card_container}>
                        <TextCard
                            title={note.title}
                            subtitle={note.created_at}
                            content={note.content}
                            onClick={() => navigate("/note/" + note.id)}
                            onClickTrash={() => deleteNote_(note)}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default NoteList;