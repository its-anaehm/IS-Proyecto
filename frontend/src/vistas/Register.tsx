import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, Redirect } from 'react-router-dom';
import RegisterForm from '../interfaces/RegisterForm';
import Modal from '@material-ui/core/Modal';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import contrato from '../constantes/contrato';

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
    card:{
        maxWidth: 500,
        height: '90%',
        position: 'absolute',
        display: 'block',
        overflow: 'scroll',
        top: '5%'
    }
  }));

function Register() {
    const requestURL: string = 'http://localhost:4000/users/register';
    const classes = useStyles();
    const [authed] = useState<boolean>(()=>{
        if(localStorage.getItem("USR_TKN")){
            return true;
        }else{
            return false;
        }
    });
    const [redirect, setRedirect] = useState<boolean>(false);
    const [registerErr, setRegisterErr] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentRegData, setCurrentRegData] = useState<RegisterForm>({
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "password": ""
    });

    function showError(){
        let message:string = "Este correo ya se encuentra en uso.";

        if(errMessage === ""){
            setErrMessage(message);
        }

        return(
        <h3 style={{color: "red"}}>{errMessage}</h3>
        );
    }

    function registerUser(){
        setShowModal(false);
    
        let data: RegisterForm = currentRegData;

        //setShowModal(true);
    
        fetch(requestURL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
          body: JSON.stringify(data)
        }).then(response => {
            if( response.status >= 400){
                setErrMessage("");
                setRegisterErr(true);
            }else{
                console.log("LLegó aqui");
                setRedirect(true);
            }
        }).catch(error => {
            setErrMessage("");
            setRegisterErr(true);
        });
    }

    function showContract(e: React.FocusEvent<HTMLFormElement>){
        e.preventDefault();

        if( 
            !(/[a-zA-Z0-9_.\-]+@(\w+.)+/g.test(`${e.target.email.value}`))
         ){
             setErrMessage("Asegurese de ingresar un correo válido.");
             setRegisterErr(true);

        }else if(e.target.password.value !== e.target.password_confirm.value){
            setErrMessage("Asegurese de escribir debidamente su contraseña al confirmarla.");
            setRegisterErr(true);

        }else{
            setRegisterErr(false);
            setCurrentRegData({
                "firstName": e.target.fname.value,
                "lastName": e.target.lname.value,
                "email": e.target.email.value,
                "phone": e.target.phone.value,
                "password": e.target.password.value
            });
    
            setShowModal(true);
        }

    }

    function closeModal(){
        setShowModal(false);

        setErrMessage("Debe de aceptar el contrato si desea crear una cuenta.");
        setRegisterErr(true);
    }

  return (
      <>
        {authed ? <Redirect to="/"/> : undefined}
        {redirect ? <Redirect to="/login"/> : undefined}
        {/************* Forma de Registro ******************/}
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography variant="h3">
                Registrate
            </Typography>
            
            <form className={classes.form} onSubmit={showContract}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                id="fname"
                label="Nombre"
                name="fname"
                autoComplete="fname"
                //InputLabelProps={{className:classes.textField}}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                id="lname"
                label="Apellido"
                name="lname"
                autoComplete="lname"
                //InputLabelProps={{className:classes.textField}}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Telefóno"
                name="phone"
                autoComplete="phone"
                //InputLabelProps={{className:classes.textField}}
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
                //autoComplete="current-password"
                //InputLabelProps={{className:"textFieldLabel"}}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password_confirm"
                label="Confirmar Contraseña"
                type="password"
                id="password_confirm"
                //InputLabelProps={{className:"textFieldLabel"}}
                />
                <br></br>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Registrarse
                </Button>
                <Grid container>
                <Grid item>         
                    <LinkRoute to="/login">{"¿Ya tienes una cuenta? Ingresa aquí."}</LinkRoute>
                </Grid>
                <Grid item>
                    {registerErr? showError(): undefined}
                </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
        <Modal
        open={showModal}
        >
            {
                <div className={classes.paper}>
                    <Card className={classes.card}>
                        <CardHeader
                        title="Antes de crear tu cuenta, debes de leer y aceptar el siguiente contrato:"
                        />
                        <CardContent>
                            <Typography
                            variant="body1"
                            style={{whiteSpace: 'pre-line'}}
                            >
                                {contrato}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                            //fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={closeModal}
                            >
                                No Acepto
                            </Button>

                            <Button
                            //fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={registerUser}
                            >
                                Acepto
                            </Button>
                        </CardActions>
                    </Card>

                </div>
            }

        </Modal>
      </>
  );
}

export default Register;