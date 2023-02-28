import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useForm } from "../../hook/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components/ImageGallery"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active, messageSaved, isSaving } = useSelector(state=>state.journal);

    const { title, body, date, onInputChange, formState } = useForm( active );

    const dateString = useMemo(()=>{
        const newDate = new Date( date );
        return newDate.toUTCString()
    },[date]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote(formState));
    }, [formState])

    useEffect(() => {
      if( messageSaved.length > 0){
        Swal.fire('Nota actualizada', messageSaved, 'success');
      }
    
    }, [messageSaved])
    

    const onSaveNote = () =>{ dispatch( startSaveNote() );}

    const onFileInputChange = ({ target }) => {
        if(target.files.length === 0) return
        dispatch( startUploadingFiles( target.files ));
    }
    
    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} >
            <Grid item >
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item >

                <input 
                    type="file" 
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{display: 'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={()=>{fileInputRef.current.click()}}
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    onClick={ onSaveNote }
                    disabled={ isSaving }
                    color="primary" sx={{ padding: 2}}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio en el dia de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />
        </Grid>
    )
}
