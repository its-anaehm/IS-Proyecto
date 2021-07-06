import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

/*Creación del estilo css para el componente*/
const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(20),
    },
    title: {
      fontFamily: "'Arimo', sans-serif",
      flexGrow: 1,
    },
    navbar: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main
    },
    logo:{
        width: 50
    }
  }));

/**
 * ! Componente de barra de navegación
 * * Contiene una barra de navegación la cual puede ser reutilizada a traves de todo el frontend
 * @author: Josué Izaguirre
 * **/

function Navbar(){
    const classes = useStyles();

    function showUser(){
        if(localStorage.getItem("USR_TKN")){
            return (
                <>
                    <PersonOutlineIcon/>
                </>
            );
        }else{
            return (
                <Link to="/login">
                    <Button color="inherit" className={classes.title}>Ingresar</Button>
                </Link>
            );
        }
    }

    return(
        <>
            {/************ Barra de Navegación **************/}
            <AppBar position="fixed" className={classes.navbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="button" className={classes.title}>
                        Inicio
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        Catálogo
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        <Link to="/">
                            <img src={logo} alt="logo" className={classes.logo} />
                        </Link>
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        Acerca De
                    </Typography>
                    <Typography variant="button" className={classes.title}>
                        Contacto
                    </Typography>
                    {showUser()}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;