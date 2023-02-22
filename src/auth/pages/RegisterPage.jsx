import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value)=> value.includes('@'), 'El correo deberia tener un arroba'], 
  password: [(value)=> value.length >= 6, 'El password debe tener más de 6 letras'], 
  displayName: [(value)=> value.length >= 1, 'El nombre debe ser obligatorio'], 
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    formState, displayName, email, password, onInputChange,  
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit =( event )=>{
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return
    dispatch( startCreatingUserWithEmailPassword( formState ));
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <h1>FormValid : { isFormValid? 'valido': 'Incorrecto' }</h1>
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Max Diaz' 
                fullWidth
                value={displayName}
                onChange={onInputChange}
                name='displayName'
                error={!!displayNameValid && formSubmitted}
                helperText={ formSubmitted && displayNameValid }
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                value={email}
                onChange={onInputChange}
                name='email'
                error={!!emailValid && formSubmitted}
                helperText={ formSubmitted && emailValid }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                value={password}
                onChange={onInputChange}
                name='password'
                error={!!passwordValid && formSubmitted}
                helperText={ formSubmitted && passwordValid }
              />
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ mb: 2 , mt: 1}}
            >
              <Grid item xs={12} >
                <Button type='submit' variant='contained' fullWidth>
                  Crear cuenta  
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1}} >Ya tienes cuenta</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                ingresar
              </Link>
            </Grid>
            
          </Grid>
        </form>
    </AuthLayout>
  )
}
