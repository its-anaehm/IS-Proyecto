import "./Categorias.css";
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { ComplaintRows } from "./Data";
import { useState } from "react";

function ComplaintList() {

    const [data, setData] = useState(ComplaintRows)

    const columns = [
        { field: 'id', headerName: 'ID', type: "number"},
        { field: 'Denounced', headerName: 'Denunciado', width: 160 },
        { field: 'Whistleblower', headerName: 'Denunciante', width: 160},
        { field: 'Reason', headerName: 'Mótivo', width: 200, editable: true },
        { 
            field: 'Desabilitar', 
            headerName: 'Desabilitar', 
            width: 200,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={"/other-user-profile/"+params.row.id} className="elementos">
                            <button className="CategoryList2">Mostrar</button>
                        </Link>
                        <Visibility className="widgetVSIcon"/>
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

export default ComplaintList;