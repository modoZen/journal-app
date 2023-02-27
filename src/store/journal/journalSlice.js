import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id:'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imagesUrls: []
    // }
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            const index = state.notes.findIndex( note => note.id === action.payload)
            state.notes[index] = state.active;
        },
        deleteNoteById: (state, action) => {

        },
    }
})

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;

export const journalReducer = journalSlice.reducer;