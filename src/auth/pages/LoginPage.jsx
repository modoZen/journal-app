import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

const formData = {
  email: 'gringo@google.com',
  password: '123456'
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state=>state.auth)

  const { email, password, onInputChange, formState } = useForm( formData )

  const isAuthenticating = useMemo(()=> status==='checking', [status]);

  const onSubmit = ( event )=>{
    event.preventDefault();

    // No es la accion a disparar
    dispatch( startLoginWithEmailPassword( formState ) )
  }

  const onGoogleSignIn = ()=>{
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ mb: 2 , mt: 1}}
            >
              <Grid item xs={12} display={ !!errorMessage? '': 'none' }>
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth
                  disabled={isAuthenticating}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Button onClick={onGoogleSignIn} variant='contained' fullWidth disabled={isAuthenticating}  >
                  <Google />
                  <Typography sx={{ml: 1}} >Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>
            
          </Grid>
        </form>
    </AuthLayout>
  )
}
