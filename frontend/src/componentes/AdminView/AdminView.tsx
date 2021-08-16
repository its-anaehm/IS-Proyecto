import Estadisticas from "../StadisticsWiew/Estadisticas";
import Info from "../Información/Info";
import WidgetProduct from "../WidgetProducts/WidgetProduct";
import WidgetUsers from "../WidgetUsers/WidgetUsers";
import "./AdminView.css";

function AdminView(){
    return (
        <div className="AdminView">
            <Info/>
            <Estadisticas/>
            <div className="AdminViewWidget">
                <WidgetUsers/>
                <WidgetProduct/>
            </div>
        </div>
    );
}

export default AdminView;