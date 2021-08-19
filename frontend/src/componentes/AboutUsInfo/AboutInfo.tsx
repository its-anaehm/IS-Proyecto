import Estadisticas from "../StadisticsWiew/Estadisticas";
import Info from "../Información/Info";
import "./AboutInfo.css";
import { Link } from 'react-router-dom';
import { Group, People, Visibility } from "@material-ui/icons";

function AboutInfo(){
    return (
        <div className="AboutUs">
            <div className="AboutUsWidget">
                <div className="container">
                    <div className="container_CardInfo"> 
                        <div className="icon"> 
                            <Group />
                        </div>
                        <h3>Misión</h3>
                        <p>Ayudar a los usuarios a vender y comprar todos aquellos productos que les sean necesarios. Así como también crear una comunidad para fortalecer el comercio electrónico en el país.</p>
                    </div>
                    <div className="container_CardInfo">
                        <div className="icon">
                            <Visibility />
                        </div>
                        <h3>Visión</h3>
                        <p>Ser la aplicación web #1 en el país para el commercio online permitiendoles a nuestros usuarios encontrar todos aquellos productos que les sean necesarios.</p>
                    </div>
                    <div className="container_CardInfo">
                        <div className="icon">
                            <People/>
                        </div>
                        <h3>¿Quienes Somos?</h3>
                        <p>Somos un grupo de estudiantes de ingeniería en sistemas computacionales con el proyecto y objetivo de ayudar a las parsonas a formar parte de un mundo digital.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutInfo;