import {createSlice} from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: 'note-slice',
    initialState: {noteList: []},
    reducers: {
        setNoteList: (currentSlice, action) => {
            currentSlice.noteList = action.payload;
        },
        addNote: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload)
        },
        updateNote: (currentSlice, action) => {
            const indexToUpdate = currentSlice.noteList.findIndex(note => note.id === action.payload);
            currentSlice.noteList[indexToUpdate] = action.payload;
        },
        deleteNote: (currentSlice, action) => {
            currentSlice.noteList = currentSlice.noteList.filter(note => note.id !== action.payload.id);
        }
    }
});

export const noteReducer = noteSlice.reducer;
export const setNoteList = noteSlice.actions.setNoteList;
export const addNote = noteSlice.actions.addNote;
export const updateNote = noteSlice.actions.updateNote;
export const deleteNote = noteSlice.actions.deleteNote;