import { CssBaseline, Grid, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from "react";
import { Redirect } from "react-router-dom";
import UserObj from "../interfaces/UserObj";
import usrImg from "../img/user.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from "@material-ui/core/Button";
import { couldStartTrivia } from "typescript";
import { BorderAll } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyItems: 'center'
    },
    colorClass:{
        color: '#233142',
        fontWeight: 'bold'
    },
    cards:{
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingRight: 7
    },
    inputs:{
        margin: theme.spacing(1)
    },
    aceptar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: 'lightgray',
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            }
        },
  }));

interface UserProfileProps{
    auth: boolean,
    currentUser: UserObj,
    setCurrentUser: (user: UserObj)=>void
}

function UserProfile({
    auth,
    currentUser,
    setCurrentUser
}:UserProfileProps){
    const classes = useStyles();
    const [showErr, setShowErr] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");


    function updateUserData(e: React.FocusEvent<HTMLFormElement>){
        e.preventDefault();
        let requestURL:string = `http://localhost:4000/users/${currentUser.ID}`;

        if( e.target.phone.value !== "" && !(`${e.target.phone.value}`.match(/\d{4}(\-)?\d{4}/))  ){
            setSuccess(false);
            setErrMessage("El teléfono ingresado no es válido.");
            setShowErr(true);

        }else{
            setErrMessage("");
            setShowErr(false);

            let nombre = e.target.userFName.value;
            let lName = e.target.userLName.value;
            let telefono = e.target.phone.value;

            let data = {
                firstName: nombre === "" ? currentUser.Nombre : nombre,
                lastName: lName==="" ? currentUser.Apellido : lName,
                email: currentUser.Email,
                phone: telefono === "" ? currentUser.Telefono : telefono
            }

            //console.log(data);
            
            fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${localStorage.getItem("USR_TKN")}`
                },
                body: JSON.stringify(data)
              }).then( response => {
                if(response.status >= 400){
                    setSuccess(false);
                    setShowErr(true);
                }else{
                    setSuccess(true);
                    response.json().then((jsonResponse) => {
                        let newUser: UserObj = {
                            ID: jsonResponse.id,
                            Nombre: `${jsonResponse.Nombre}`,
                            Apellido: `${jsonResponse.Apellido}`,
                            Email: `${jsonResponse.Email}`,
                            Telefono: `${jsonResponse.Telefono}`
                        };
                        setCurrentUser(newUser);
                        localStorage.setItem("USR", JSON.stringify(newUser));
                    });
                }
              } ).catch(error => {
                setSuccess(false);
                setShowErr(true);
              });
        }

        

    }



//JUAN
/*
function getProducst(){
    fetch("http://localhost:4000/products", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then( response =>{
        if(response.status < 400){
            response.json().then( jsonResponse => {
                let product: ProductObj ={

                }
                
            } )
        }
    } ).catch(error => {
        console.log(error);
    });

}




function showProducs(){

    let hola = (<div style={{color: "green", background: "#F95959", border: "15px" }}
    >Los cambios se han guardado con éxito.</div>
    );

    return hola
}*/
//JUAN


    function showError(){
        let message:string = "Ha surgido un error.";

        if(errMessage === ""){
            setErrMessage(message);
        }

        return(
        <h3 style={{color: "red"}}>{errMessage}</h3>
        );
    }

    function showSuccess(){
        return(
            <h3 style={{color: "green"}}>Los cambios se han guardado con éxito.</h3>
        )
    }
    
    return(
        <>
            {auth ? undefined : <Redirect to="/"/>}

            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid
                    container
                    spacing={5}
                    md={12}
                    >
                        <Grid
                        item
                        md={12}
                        style={{
                            justifyItems: 'center',
                            display: 'grid',
                            paddingBottom: 0
                        }}
                        >
                            <div
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '2%'
                            }}
                            >
                                <Grid
                                container
                                md={12}
                                justifyContent="center"
                                style={{
                                    justifyItems: 'center',
                                    display: 'grid'
                                }}        
                                >
                                    <Grid
                                    item
                                    md={12}
                                    >
                                        <img src={usrImg} alt="Icono de usuario." />
                                    </Grid>
                                    <Grid
                                    item
                                    md={12}
                                    >
                                        <Typography
                                        variant="h4"
                                        >
                                            {`${currentUser.Nombre} ${currentUser.Apellido}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid
                        item
                        md={12}
                        >
                            <div
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            >
                                <Grid
                                container
                                md={12}
                                spacing={6}
                                //cols={3}
                                >
                                    {/*********Información del Usuario*********/}
                                    <Grid
                                    item
                                    md={4}
                                    >
                                        <Card
                                        className={classes.cards}
                                        >
                                            <CardHeader
                                            title="Datos del Usuario"
                                            align= "Center"
                                            />
                                            <CardContent>
                                                <form
                                                onSubmit={updateUserData}
                                                >
                                                    <Typography variant="h6">
                                                        Nombre
                                                    </Typography>
                                                    <TextField
                                                    id="userFName"
                                                    fullWidth
                                                    //label="Nombre"
                                                    placeholder={currentUser.Nombre}
                                                    variant="outlined"
                                                    className={classes.inputs}
                                                    />
                                                    <Typography variant="h6">
                                                        Apellido
                                                    </Typography>
                                                    <TextField
                                                    id="userLName"
                                                    fullWidth
                                                    //label="Apellido"
                                                    placeholder={currentUser.Apellido}
                                                    variant="outlined"
                                                    className={classes.inputs}
                                                    />
                                                    <Typography variant="h6">
                                                        Correo
                                                    </Typography>
                                                    <TextField
                                                    id="email"
                                                    fullWidth
                                                    //label="Correo"
                                                    value={currentUser.Email}
                                                    variant="outlined"
                                                    aria-readonly
                                                    className={classes.inputs}
                                                    />
                                                    <Typography variant="h6">
                                                        Teléfono
                                                    </Typography>
                                                    <TextField
                                                    id="phone"
                                                    fullWidth
                                                    //label="Correo"
                                                    placeholder={currentUser.Telefono}
                                                    variant="outlined"
                                                    className={classes.inputs}
                                                    />
                                                    <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.aceptar}
                                                    >
                                                        Actualizar Datos
                                                    </Button>
                                                </form>
                                                { showErr ? showError(): undefined }
                                                { success ? showSuccess(): undefined }
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/*********Historial de Publicaciones*********/}                                    
                                    <Grid
                                    item
                                    md={4}
                                    >
                                        <div
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                            
                                        }}
                                        >   
                                            <Card className={classes.cards} >
                                                <CardHeader
                                                title="Historial de Publicaciones"
                                                align= "Center"
                                                
                                            />
                                                <CardContent 
                                                style={{
                                                    height: 508,
                                                    overflowY: 'scroll'
                                                }}>
                                                    
                                                </CardContent>

                                            </Card>
                                        </div>
                                    </Grid>

                                    {/*********Favoritos*********/}
                                    <Grid
                                    item
                                    md={4}
                                    >
                                        <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        >   
                                            <Card className={classes.cards}>
                                                <CardHeader
                                                title="Favoritos"
                                                align= "Center"
                                            />
                                                <CardContent 
                                                style={{
                                                    height: 542,
                                                    overflowY: 'scroll'
                                                }}>
                                                </CardContent>

                                            </Card>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>   
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default UserProfile;