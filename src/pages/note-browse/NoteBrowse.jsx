import NoteList from "../../components/note-list/NoteList";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import SearchBar from "../../components/search-bar/SearchBar";
import {useEffect, useState} from "react";
import {withAuthRequired} from "../../hoc/withAuthRequired";

function NoteBrowse(params) {
    const noteList = useSelector(store => store.noteSlice.noteList)

    const [searchTerm, setSearchTerm] = useState("")

    const filteredNoteList = noteList.filter((note) => {
        const containsTitle = note.title.trim().toUpperCase().includes(searchTerm.trim().toUpperCase())
        const containsContent = note.content.trim().toUpperCase().includes(searchTerm.trim().toUpperCase())
        return containsTitle || containsContent
    })

    return (
        <div>
            <div className={"row justify-content-center mb-5"}>
                <div className={"col-sm-12 col-md-4"}>
                    <SearchBar onChange={setSearchTerm} placeholder={"Search your notes ..."}/>
                </div>
            </div>
            {
                noteList?.length === 0 && (
                    <div className={"d-flex justify-content-center"}>
                        <span>
                            You don't have any note, do you want to{" "}
                            <Link to={"/note/new"}>create one</Link>
                        </span>
                    </div>
                )
            }
            <NoteList list={filteredNoteList}/>
        </div>
    )
}

export default NoteBrowse;