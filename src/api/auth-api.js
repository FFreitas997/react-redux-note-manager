import {Firebase as FirebaseService} from '../service/Firebase'
import {signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'

export class AuthApi {

    static async signIn(email, password) {
        const response = await signInWithEmailAndPassword(FirebaseService.auth, email, password);
        return response.user.toJSON();
    }

    static async signUp(email, password) {
        const response = await createUserWithEmailAndPassword(FirebaseService.auth, email, password);
        return response.user.toJSON();
    }

    static async signOut() {
        await signOut(FirebaseService.auth)
    }

}