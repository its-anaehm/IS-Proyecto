import "./WidgetProduct.css";
import { Link } from 'react-router-dom';
import { Store, Visibility } from "@material-ui/icons";

function WidgetProduct(){
    return (
        <div className="WidgetProduct">
            <Link to="/complaint" className="WidgetProductTitle">Productos</Link>
            <ul className="WidgetProductList">
                <li className="WidgetProductListItem">
                    <Store className="WidgetProducttIcon"/>
                    <div className="WidgetProductInfo">
                        <span className="WidgetProductName">Producto 1</span>
                        <span className="WidgetProductUser">Nombre del Dueño</span>
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

export default WidgetProduct;