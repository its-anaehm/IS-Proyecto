import "./Categorias.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductObj from "../../interfaces/ProductObj";
import { Redirect } from "react-router-dom";
import placeholder from "../../img/item-placeholder.png";
import Delete from "../../componentes/Delete";

let templateProducts: ProductObj[] = [{
    id: 0,
    owner: "Juan Orlando",
    department: "Honduras de alla",
    municipy: "Tela",
    name: "Baleada",
    price: "13",
    details: "Baleada con queso y horchata",
    images: [`${placeholder}`],
    date: "ayer",
    Disponibilidad: "Disponible"
}];

interface Published{
	id: number,
	published: string,
	date: string,
	image: string
}

function ProductsList() {

    const [products, setProducts] = useState<ProductObj[] | []>(templateProducts);
    const [publishedProducts, setPublished] = useState<ProductObj[]>(templateProducts);

    function getProducts(){
        fetch('http://localhost:4000/products/getAllProductsConfig',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        ).then( response => {
            if(response.status < 400){
                response.json().then(jsonResponse => {
                    console.log(jsonResponse)
                    setProducts(jsonResponse);
                })
            }
        }).catch(e=>{
            console.log(e);
        });
    }
    function getPublishedProducts(){
		fetch("http://localhost:4000/users/published", {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then( response =>{
				if(response.status < 400){
						response.json().then( jsonResponse => {
								let result:ProductObj[] = jsonResponse.message.map( (product: Published):ProductObj => {
									return {
										id: product.id,
										name: product.published,
										images: [product.image],
										date: product.date
									}
								});
								setPublished(result);
						} )
				}
		} ).catch(error => {
				console.log(error);
		});

	}

    function removeFromListed(id:number){
		fetch(`http://localhost:4000/products/${id}/0`, {
				method: 'PUT',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then(response =>{
			if(response.status < 400){
					//setFav(false);
					getProducts();
			}
	}).catch(e=>{
			console.log(e)
		});
	}

    useEffect(() => {
        getProducts();
        getPublishedProducts();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 120 },
        { field: 'ProductName', headerName: 'Nombre del Producto', width: 300, editable: true },
        { field: 'Departamento', headerName: 'Departamento', width: 180, editable: true },
        { field: 'Precio', headerName: 'Precio', type: 'number', width: 200, editable: true },
        { 
            field: 'Desabilitar', 
            headerName: ' ', 
            width: 110,
            renderCell: (params: any) => {
                return (
                    <>
                        <Delete paramsid={params.id} products={publishedProducts} removeFunction={removeFromListed}/>
                    </>
                )
            } 
        },
    ];

    console.log(products)

    const rows: any = []
    {products.map((row) => (
        rows.push ({ id: row.id, ProductName: row.name, Departamento: row.department, Precio: row.price,  Estado: row.Disponibilidad })
    ))};

    return (
        <>
            <div className="CategoryList">
            
                <DataGrid
                    rows={rows}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default ProductsList;