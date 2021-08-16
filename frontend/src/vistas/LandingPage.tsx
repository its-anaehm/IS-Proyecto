//import { Link as LinkRoute } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect, useState } from "react";
import Typography from "material-ui/styles/typography";
import { Button } from "@material-ui/core";
import UserObj from "../interfaces/UserObj";
import UserHome from '../componentes/UserHome';
import GuestHome from '../componentes/GuestHome';
import AdminHome from '../componentes/AdminHome';

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    },
    main:{
        marginLeft: "5%",
        marginRight: "15%"
    }
}));

  interface LandingPageProps {
    auth: boolean,
    currentUser: UserObj
  }

function LandingPage({
    auth,
    currentUser
    }:LandingPageProps
){
    const classes = useStyles();

    const rol = localStorage.getItem("USR_R");

    return(
        <>
            <Container component="main" maxWidth="lg" className={classes.main}>
            <CssBaseline />
                <div className={classes.paper}>
                    {auth ? (rol == "Administrador" ? <AdminHome currentUser={currentUser}/> : <UserHome currentUser={currentUser}/>) : <GuestHome/>}
                </div>
            </Container>
        </>
    )
}

export default LandingPage;