import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProtectedApp} from './App';
import "./index.css";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoteBrowse from "./pages/note-browse/NoteBrowse";
import Note from "./pages/note/Note";
import NoteCreate from "./pages/note-create/NoteCreate";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import {Firebase} from "./service/Firebase";
import {PersistGate} from "redux-persist/integration/react";

Firebase.init();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/" element={<ProtectedApp/>}>
                            <Route path="/" element={<NoteBrowse/>}/>
                            <Route path="/note/:id" element={<Note/>}/>
                            <Route path="/note/new" element={<NoteCreate/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
