import { signInWithGoogle } from "../../firebase/providers"
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