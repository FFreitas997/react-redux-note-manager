import {firebaseConfig} from "../config";
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

export class Firebase {

    static firebaseApp = undefined;
    static auth = undefined;
    static database = undefined;

    static init() {
        this.firebaseApp = initializeApp(firebaseConfig)
        this.auth = getAuth();
        this.database = getFirestore(this.firebaseApp)
    }
}