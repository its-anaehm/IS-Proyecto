//import { Link as LinkRoute } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from "react";
import Typography from "material-ui/styles/typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));


function LandingPage(){
    const requestURL:string = "http://localhost:4000/users/my_details";
    const classes = useStyles();
    const [authed, setAuthedState] = useState<boolean>(()=>{
        if(localStorage.getItem("USR_TKN")){
            return true;
        }else{
            return false;
        }
    });

    function showUserInfo(){
        let data;

        if (localStorage.getItem("USR_TKN") !== null){
            data = localStorage.getItem("USR_TKN");
        }

        let token = `${data}`;

        fetch(requestURL, {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Accept': 'application/json', 'Authorization':token}
          }).then( response => {
            if(response.status >= 400){
              console.log("Error");
            }else{
              response.json().then(jsonResponse => {
                console.log(jsonResponse);
              });
            }
          } ).catch(error => console.log(error));

          return(
              <>
                <h2>
                    Un usuario se encuentra registrado
                </h2>
                <Button onClick={signOut}>
                    Cerrar Sesión
                </Button>
              </>
          );
    }

    function signOut(){
        localStorage.removeItem("USR_TKN");
        setAuthedState(false);
    }

    function showNoLoggedUser(){
        return(
            <h2>
                En estos momentos no se encuentra ningun usuario en sesión.
            </h2>
        );
    }

    return(
        <>
            <Navbar/>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper}>
                    {authed ? showUserInfo() : showNoLoggedUser()}
                </div>
            </Container>
        </>
    )
}

export default LandingPage;