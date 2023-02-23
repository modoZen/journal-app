import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { loggout, login } from "../store/auth/authSlice";


export const useCheckAuth = ()=>{
    const { status } = useSelector(state=>state.auth);
    const dispatch = useDispatch();
  
    useEffect(()=>{
      onAuthStateChanged( FirebaseAuth, async ( user )=>{
        if(!user) return dispatch(loggout());
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({uid, email, displayName, photoURL}));
      });
  
    },[])

    return {
        status
    }
}