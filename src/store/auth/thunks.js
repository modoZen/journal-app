import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, loggout, login } from "./authSlice"

export const checkingAuthentication = (email, password)=>{
    return async (dispatch) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch)=>{
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( loggout( { errorMessage: result.errorMessage} ) );
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch)=>{
        dispatch( checkingCredentials() );
        const {ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});
        if( !ok ) return dispatch(loggout({errorMessage}))
        dispatch( login( { uid, displayName, email, photoURL } ) );
    }
}

export const startLoginWithEmailPassword = ({ email, password }) =>{
    return async ( dispatch )=>{
        dispatch( checkingCredentials() );
        const {ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailPassword({ email, password });
        if( !ok ) return dispatch( loggout( { errorMessage} ) );
        dispatch( login( { uid, displayName, email, photoURL } ) );
    }
}

export const startLogout = () =>{
    return async (dispatch)=>{
        await logoutFirebase();
        dispatch( clearNotesLogout());
        dispatch(loggout());
    }
}