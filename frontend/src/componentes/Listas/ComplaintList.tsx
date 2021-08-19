import "./Categorias.css";
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ComplaintObj from "../../interfaces/ComplaintObj";

function ComplaintList() {

    let templateProducts: ComplaintObj[] = [{
        id: 0,
        fk_id_denunciador: 0,
        fk_id_acusado: 0,
        NombreDenunciador: "string",
        NombreAcusado: "string",
        date: "string",
        Tipo_Denuncia: 0,
        Estado: "string"
    }];
    
        const [complaint, setComplaint] = useState<ComplaintObj[] | []>(templateProducts);
        const [id_acusado, setIDAcusado] = useState<number>(0);
    
        useEffect(() => {
            getComplaint();
        }, []);
    
        function getComplaint(){
            fetch('http://localhost:4000/complaints/listcomplaint',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${localStorage.getItem("USR_TKN")}`
                }
            }
            ).then( response => {
                if(response.status < 400){
                    response.json().then(jsonResponse => {
                        setComplaint(jsonResponse.message);
                    })
                }
            }).catch(e=>{
                console.log(e);
            });
        }


    


    const columns = [
        { field: 'id', headerName: 'ID', type: "hidden"},
        { field: 'Denounced', headerName: 'Denunciado', width: 200 },
        { field: 'id_Denounced', headerName: 'id', type: 'hidden'},
        { field: 'Whistleblower', headerName: 'Denunciante', width: 200},
        { field: 'Reason', headerName: 'Mótivo', width: 200, editable: true },
        { 
            field: 'Mostrar', 
            headerName: 'Mostrar', 
            width: 200,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={"/other-user-profile/"+params.row.id_Denounced+"/"+params.row.Reason} className="elementos">
                            <button className="CategoryList2">Mostrar</button>
                        </Link>
                        <Visibility className="CategoryListIcon"/>
                    </>
                )
            } 
        },
    ];

    const rows: any = []
    {complaint.map((row) => (
        rows.push ({ id: row.id, Denounced: row.NombreAcusado, id_Denounced: row.fk_id_acusado, Whistleblower: row.NombreDenunciador, Reason: row.Tipo_Denuncia} )
    ))};

    return (
        <div className="CategoryList">
            <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}

export default ComplaintList;