import {addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc} from 'firebase/firestore'
import {Firebase} from "../service/Firebase";

export class NoteApi {

    static async create(note) {
        const response = await addDoc(collection(Firebase.database, "notes"), note);
        return {id: response.id, ...note}
    }

    static async fetchAll() {
        const queryBuild = query(collection(Firebase.database, "notes"), orderBy("created_at", "asc"));
        const response = await getDocs(queryBuild)
        return response.docs.map(e => ({id: e.id, ...e.data()}))
    }

    static async deleteByID(id) {
        await deleteDoc(doc(Firebase.database, "notes", id))
    }

    static async updateByID(id, note) {
        const query = doc(Firebase.database, "notes", id)
        await updateDoc(query, note);
        return {id, ...note}
    }

    static onShouldSyncNotes(callback) {
        const q = query(collection(Firebase.database, "notes"))
        return onSnapshot(q, (querySnapshot) => {
            const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites
            if (!isUserPerformingChange)
                callback();
        });
    }
}