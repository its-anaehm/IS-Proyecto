import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute } from 'react-router-dom';
import LoginForm from '../interfaces/LoginForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      justifyContent: "center"
    },
    submit: {
      //width: "30%",
      margin: theme.spacing(1, 0, 2),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      border: "4px solid",
      fontWeight: "bold",
      '&:hover':{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.background.paper,
        }
    },
    textField:{
      border: '4px solid #455D7A',
      borderRadius: 13,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      fontWeight: "bold"
    },
    focusedInput:{
      color: theme.palette.background.paper
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      fontFamily: "'Arimo', sans-serif",
      flexGrow: 1,
    },
  }));

function Login() {
    const classes = useStyles();
    const requestURL: string = 'http://localhost:4000/users/login';
    const [loginErr, setLoginErr] = useState<boolean>(false);

    function mostrarError(){
        return(
        <h3 style={{color: "red"}}>El usuario o contraseña son incorrectos.</h3>
        );
    }

    function verificarDatos(e: React.FocusEvent<HTMLFormElement>){
        e.preventDefault();
    
        let datos: LoginForm = {"email": e.target.email.value,"password": e.target.password.value};
    
        fetch(requestURL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
          body: JSON.stringify(datos)
        }).then(respuesta => respuesta.json()).then( resJSON =>{
          console.log(resJSON);
          if(resJSON.message === "Login Successful"){
            setLoginErr(false);
            //localStorage.setItem("LOCAL_USER",JSON.stringify(resJSON.user));
    
          }else{
            setLoginErr(true);
          }
        }).catch((error) => {
          setLoginErr(true);
        });
      }

  return (
    <>
    {/************ Barra de Navegación **************/}
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>

    {/*********** Contenido de la página ************/}
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Ingresa con tu cuenta
        </Typography>
        <form className={classes.form} onSubmit={verificarDatos}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            InputLabelProps={{className:classes.textField}}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{className:"textFieldLabel"}}
            />
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Guardar Datos"
            />
            <br></br>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Ingresar
            </Button>
            <Grid container>
            <Grid item>         
                <LinkRoute to="/register">{"¿No tienes una cuenta? Registrate aquí"}</LinkRoute>
            </Grid>
            <Grid item>
                {loginErr? mostrarError(): undefined}
            </Grid>
            </Grid>
        </form>
        </div>
        <Box mt={8}>
        </Box>
    </Container>
    </>
  );
}

export default Login;