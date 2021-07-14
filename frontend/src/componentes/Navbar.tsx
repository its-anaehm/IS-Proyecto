import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../img/logo.png';
import { Link, Redirect } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import UserObj from '../interfaces/UserObj';

/*Creación del estilo css para el componente*/
const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(20),
    },
    title: {
      fontFamily: "'Arimo', sans-serif",
      flexGrow: 1,
      textDecoration: 'none'
    },
    anchors:{
        textDecoration: 'none',
        '&:visited':{
            color: theme.palette.primary.main
        },
        color: theme.palette.primary.main
    },
    navbar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main
    },
    logo:{
        width: 50
    },
    menu_cont:{
        "& .MuiPaper-root": {
            backgroundColor: theme.palette.primary.main
        }
    },
    menu_items:{
        textDecoration: 'none',
        '&:visited':{
            color: theme.palette.background.paper
        },
        color: theme.palette.background.paper
    }
  }));

/**
 * ! Componente de barra de navegación
 * * Contiene una barra de navegación la cual puede ser reutilizada a traves de todo el frontend
 * @author: Josué Izaguirre
 * **/

interface NavbarProps{
    auth: boolean,
    setAuth: (auth: boolean)=>void,
    currentUser: UserObj
}

function Navbar({
    auth,
    setAuth,
    currentUser
}:NavbarProps){
    const classes = useStyles();
    const [opened, setOpened] = useState<null | HTMLElement>(null);
    const [redirect, setRedirect] = useState<boolean>(false);

    function openMenu( event: React.MouseEvent<HTMLButtonElement> ){
        setOpened(event.currentTarget);
    }

    function closeMenu(){
        setOpened(null);
    }

    function getUserName(){
        return `${currentUser.Nombre} ${currentUser.Apellido}`;
    }

    function signOut(){
        localStorage.removeItem("USR_TKN");
        localStorage.removeItem("USR");
        setAuth(false);
        setRedirect(true);
        closeMenu();
    }

    function showButton(){
        if(auth){
            return (
                <>
                    Perfil
                    <PersonOutlineIcon/>
                </>
            );
        }else{
            return (
                <>
                Invitado
                </>
            );
        }
    }

    function showMenu(){
        if(auth){
            return(
                <Menu
                id="simple-menu"
                anchorEl={opened}
                keepMounted
                open={Boolean(opened)}
                onClose={closeMenu}
                className={classes.menu_cont}
                >
                    <MenuItem>
                        <Typography variant="h5" className={classes.menu_items}>
                            {getUserName()}
                        </Typography>
                    </MenuItem>
                    <MenuItem className={classes.menu_items}>
                        <Link to="/user-profile" className={classes.menu_items}>
                            Mi Cuenta
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={signOut} className={classes.menu_items}>Cerrar Sesión</MenuItem>
                </Menu>
            );
        }else{
            return(
                <Menu
                id="simple-menu"
                anchorEl={opened}
                keepMounted
                open={Boolean(opened)}
                onClose={closeMenu}
                className={classes.menu_cont}
                >
                    <MenuItem className={classes.menu_items}>
                        <Link to="/login" className={classes.menu_items}>
                            Iniciar Sesión
                        </Link>
                    </MenuItem>
                    <MenuItem className={classes.menu_items}>
                        <Link to="/register" className={classes.menu_items}>
                            Registrarse
                        </Link>
                    </MenuItem>
                </Menu>
            );
        }
    }

    return(
        <>
            {redirect ? <Redirect to="/"/> : undefined}
            {/************ Barra de Navegación **************/}
            <AppBar position="fixed" className={classes.navbar}>
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>*/}
                    <Typography variant="button" className={classes.title}>
                        <Link to="/" className={classes.anchors}>
                            Inicio
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/products" className={classes.anchors}>
                            Catálogo
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/about-us" className={classes.anchors}>
                            Acerca De
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/">
                            <img src={logo} alt="logo" className={classes.logo} />
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/contact-us" className={classes.anchors}>
                            Contacto
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/add-product"  className={classes.anchors}>
                            <AddCircleOutlineIcon/>
                        </Link>
                    </Typography>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
                        {showButton()}
                    </Button>
                    {showMenu()}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;