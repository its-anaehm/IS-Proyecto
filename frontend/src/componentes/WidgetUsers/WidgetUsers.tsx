import { Person, Visibility } from "@material-ui/icons";
import "./WidgetUsers.css";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menu_items:{
        textDecoration: 'none',
        '&:visited':{
            color: theme.palette.background.paper
        },
        color: theme.palette.background.paper
    }
  }));


function WidgetUsers(){
    const classes = useStyles();
    return (
        <div className="WidgetUsers">
            <Link to="/complaint" className="widgetUserTitle">Denuncias de Usuarios</Link>
            <ul className="widgetUserList">
                <li className="widgetUserListItem">
                    <Person className="widgeUsertIcon"/>
                    <div className="widgetUserInfo">
                        <span className="widgetUserName">Omen Truco</span>
                        <span className="widgetUserDenuncia">Motivo de Denuncia</span>
                    </div>
                    <button className="buttom">
                        <Visibility className="widgetVSIcon"/>
                        <Link to="/other-user-profile/1" className={classes.menu_items}>
                            Mostrar
                        </Link>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default WidgetUsers;