import CategoryObj from "../interfaces/CategoryObj"
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";

interface DeleteProps{
    paramsid: number,
    category: CategoryObj[],
    removeFunction: (id: number)=>void
}

function Delete({
    paramsid,
    category,
    removeFunction
}:DeleteProps){

    function removeProduct(categoryID: number){
        removeFunction(categoryID);
    }

    return(
        <div>
            {category.map((categorys: CategoryObj) => (
                <Link to={"/Setting"} className="elementos">
                    <button className="CategoryList2" onClick={ ()=>{removeProduct(paramsid);} }>Eliminar</button>
                    <DeleteOutline className="CategoryListIcon"/>
                </Link>
            ))}
        </div>
    );
}

export default Delete;