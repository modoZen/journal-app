import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'

const formData = {
  email: 'lmlmaxlml@gmail.com',
  password: '123456',
  displayName: 'Max Diaz'
}

export const RegisterPage = () => {

  const { displayName, email, password, onInputChange, formState } = useForm(formData);

  const onSubmit =( event )=>{
    event.preventDefault();
    console.log(formState);
  }

  return (
    <AuthLayout title='Crear cuenta'>
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
