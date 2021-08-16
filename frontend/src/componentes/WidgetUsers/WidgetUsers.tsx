import { Person, Visibility } from "@material-ui/icons";
import "./WidgetUsers.css";
import { Link } from 'react-router-dom';

function WidgetUsers(){
    return (
        <div className="WidgetUsers">
            <Link to="/catalogue" className="widgetUserTitle">Denuncias de Usuarios</Link>
            <ul className="widgetUserList">
                <li className="widgetUserListItem">
                    <Person className="widgeUsertIcon"/>
                    <div className="widgetUserInfo">
                        <span className="widgetUserName">Omen Truco</span>
                        <span className="widgetUserDenuncia">Motivo de Denuncia</span>
                    </div>
                    <button className="buttom">
                        <Visibility className="widgetVSIcon"/>
                        Mostrar
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default WidgetUsers;