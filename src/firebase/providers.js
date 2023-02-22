import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ()=>{
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (err) {
        
        const errorCode = err.code;
        const errorMessage = err.message;

        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName })=>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        console.log(resp);        
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;

        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}