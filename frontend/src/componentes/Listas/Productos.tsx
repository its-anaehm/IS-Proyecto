import "./Categorias.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { ProductRows } from "./Data";
import { useState } from "react";

function ProductsList() {

    const [data, setData] = useState(ProductRows)

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 120 },
        { field: 'ProductName', headerName: 'Nombre del Producto', width: 300, editable: true },
        { field: 'Departamento', headerName: 'Departamento', width: 200, editable: true },
        { field: 'Precio', headerName: 'Precio', type: 'number', width: 300, editable: true },
        { 
            field: 'Desabilitar', 
            headerName: 'Dar de Baja', 
            width: 200,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={"/user/"+params.row.id} className="elementos">
                            <button className="CategoryList2">Eliminar</button>
                            <DeleteOutline className="CategoryListIcon"/>
                        </Link>
                    </>
                )
            } 
        },
    ];
    return (
        <div className="CategoryList">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}

export default ProductsList;