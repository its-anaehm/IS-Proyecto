import { Person, Visibility } from "@material-ui/icons";
import "./WidgetUsers.css";
import { Link } from 'react-router-dom';
import ComplaintObj from "../../interfaces/ComplaintObj";
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function WidgetUsers(){
    
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
    
        useEffect(() => {
            getComplaint();
        }, []);
    
        function getComplaint(){
            fetch('http://localhost:4000/complaints/listcomplaintLimit',{
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

    return (
        
        <div className="WidgetUsers">
            <Link to="/complaint" className="widgetUserTitle">Denuncias de Usuarios</Link>
            <ul className="widgetUserList">
                <li className="widgetUserListItem">
                    <div className="widgetUserInfo">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Acusado</TableCell>
                                        <TableCell align="right" >Fecha</TableCell>
                                        <TableCell align="right" ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {complaint.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell component="th" scope="row" width="200">
                                        {data.NombreAcusado}
                                    </TableCell>
                                    <TableCell align="right" width="200">{data.date}</TableCell>
                                    <TableCell align="right" width="100">
                                        <button className="buttom">
                                            <Visibility className="widgetVSIcon"/>
                                            <Link to="/other-user-profile/1" className="MostrarC">
                                                Mostrar
                                            </Link>
                                        </button>                                        
                                    </TableCell>
                                </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default WidgetUsers;