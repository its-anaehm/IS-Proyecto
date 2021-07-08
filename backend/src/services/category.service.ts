import { db } from "../config/database";

export class CategoryService
{
    public static categoryFilter = async () =>
    {
        const [row, fields] = await db.query('SELECT * FROM categoria');
        let jsonCategory = JSON.parse(JSON.stringify(row));
        return jsonCategory;   
    }
}