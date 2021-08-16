import "./sidebar.css"
import {LineStyle, Timeline, TrendingUp, PermIdentity, Storefront, NewReleasesOutlined, QueuePlayNextOutlined, Settings} from "@material-ui/icons"
import { Link, Redirect } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Acceso Directo</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon"/> 
                            <Link to="/" className="menu_items">
                                Inicio
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/> 
                            <Link to="/Statistics" className="menu_items">
                                Estadísticas
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon"/>
                            <Link to="/Sales" className="menu_items">
                                Ventas
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Menú Rápido</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <Storefront className="sidebarIcon"/> 
                            <Link to="/catalogue" className="menu_items">
                                Productos
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <NewReleasesOutlined className="sidebarIcon"/>
                            <Link to="/complaint" className="menu_items">
                                Denuncias
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <QueuePlayNextOutlined className="sidebarIcon"/>
                            <Link to="/Advertisements" className="menu_items">
                                Anuncios
                            </Link>
                        </li>
                        <li className="sidebarListItem"> 
                            <Settings className="sidebarIcon"/>
                            <Link to="/Setting" className="menu_items">
                                Configuración
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;