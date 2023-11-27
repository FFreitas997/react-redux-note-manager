import style from './style.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import Header from "./components/header/Header";
import {useEffect} from "react";
import {NoteApi} from "./api/note-api";
import {setNoteList} from "./store/notes/notes-slice";
import {useDispatch} from "react-redux";
import {withAuthRequired} from "./hoc/withAuthRequired";
import ButtonPrimary from "./components/button-primary/ButtonPrimary";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchAllNotes() {
        const notes = await NoteApi.fetchAll();
        dispatch(setNoteList(notes))
    }

    useEffect(() => {
        const unSubscribe = NoteApi.onShouldSyncNotes(fetchAllNotes);
        return () => { unSubscribe(); }
    }, [])

    return (
        <div>
            <Header/>
            <ButtonPrimary className={style.buttonAdd} onClick={() => navigate("/note/new")}>+</ButtonPrimary>
            <div className={style.workspace}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
export const ProtectedApp = withAuthRequired(App)
