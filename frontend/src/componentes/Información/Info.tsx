import "./Info.css";
import { ArrowDownward, ArrowUpward, Remove } from "@material-ui/icons"

function Info(){
    return (
        <div className="Info">
            <div className="InfoWrapper">
            <div className="infoItem">
                <span className="infoTitle">Ingresos</span>
                <div className="infoMoneyContainer">
                    <span className="infoMoney">Lps. 0.00</span>
                    <span className="infoMoneyRate">
                        0% <Remove className="infoIconDif"/>
                    </span>
                </div>
                <span className="infoSub">Comparando con el Mes anterior</span>
            </div>
            <div className="infoItem">
                <span className="infoTitle">Ventas</span>
                <div className="infoMoneyContainer">
                    <span className="infoMoney">Lps. 4,416</span>
                    <span className="infoMoneyRate">
                        -1.4 <ArrowDownward className="infoIcon negative"/> 
                    </span>
                </div>
                <span className="infoSub">Comparando con el Mes anterior</span>
            </div>
            <div className="infoItem">
                <span className="infoTitle">Perdidas</span>
                <div className="infoMoneyContainer">
                    <span className="infoMoney">Lps. 2,000</span>
                    <span className="infoMoneyRate">
                        +4.4 <ArrowUpward className="infoIcon"/> 
                    </span>
                </div>
                <span className="infoSub">Comparando con el Mes anterior</span>
            </div>
            </div>
        </div>
    );
}

export default Info;