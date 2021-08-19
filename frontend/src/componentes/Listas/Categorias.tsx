import "./Categorias.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { CategoryRows } from "./Data";
import { useEffect, useState } from "react";
import CategoryObj from "../../interfaces/CategoryObj";
import DeleteCategory from "../../componentes/DeleteCategory";

let templateCategories: CategoryObj[] = [{
    id: 0,
    Nombre: "Categoria",
    Imagen: "",
    Num_Visita: 0,
    Estado: 0
  }];

function CategoryList() {

    const [categories, setCategories] = useState<CategoryObj[] | []>(templateCategories);

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories(){
        fetch('http://localhost:4000/category/ ',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        ).then( response => {
            if(response.status < 400){
                response.json().then(jsonResponse => {
                setCategories(jsonResponse.category)
            })
        }
        } ).catch(e=>{
            console.log(e);
        });
    }

    function removeFromListed(id:number){
		fetch(`http://localhost:4000/category/removeCategory/${id}`, {
				method: 'GET',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then(response =>{
			if(response.status < 400){
					//setFav(false);
					getCategories();
			}
	}).catch(e=>{
			console.log(e)
		});
	}

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 120 },
        { field: 'CategoryName', headerName: 'Nombre de la Categoria', width: 300, editable: true },
        { field: 'Vistas', headerName: 'Vistas', type: 'number', width: 300, editable: true },
        { 
            field: 'Desabilitar', 
            headerName: ' ', 
            width: 110,
            renderCell: (params: any) => {
                return (
                    <>
                        <DeleteCategory paramsid={params.id} category={categories} removeFunction={removeFromListed}/>
                    </>
                )
            } 
        },
    ];

    const rows: any = []
    {categories.map((row) => (
        rows.push ({ id: row.id, CategoryName: row.Nombre, Vistas: rows.num_Visita,  Desabilitar: 'si' } )
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

export default CategoryList;