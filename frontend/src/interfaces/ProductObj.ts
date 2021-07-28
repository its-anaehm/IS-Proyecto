interface ProductObj{
    id: number,
    owner?: string,
    category?: number,
    department?: string,
    municipy?: string,
    name: string
    price?: string,
    images: string[],
    date?: string,
    details?:string
}


export default ProductObj;