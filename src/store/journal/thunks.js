import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState ) => {

        dispatch( savingNewNote() );
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote( newNote ));
        dispatch(setActiveNote( newNote ));
    }
}

export const startLoadingNotes = ()=> {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');
        
        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active } = getState().journal;

        const noteToFireStore = { ...active };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}` );
        await setDoc(docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote( active.id ));
    
    }   
}

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) => {
        dispatch( setSaving() );
        const photoUrls = await Promise.all([...files].map(fileUpload));
        console.log({photoUrls});
        dispatch( setPhotosToActiveNote( photoUrls ) )
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) )

    }
}