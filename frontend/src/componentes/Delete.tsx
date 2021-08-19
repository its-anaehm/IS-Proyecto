import ProductObj from "../interfaces/ProductObj"
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";

interface DeleteProps{
    paramsid: number,
    products: ProductObj[],
    removeFunction: (id: number)=>void
}

function Delete({
    paramsid,
    products,
    removeFunction
}:DeleteProps){

    function removeProduct(productID: number){
        removeFunction(productID);
    }

    return(
        <div>
            {products.map((product: ProductObj) => (
                <Link to={"/Setting"} className="elementos">
                    <button className="CategoryList2" onClick={ ()=>{removeProduct(paramsid);} }>Eliminar</button>
                    <DeleteOutline className="CategoryListIcon"/>
                </Link>
            ))}
        </div>
    );
}

export default Delete;