import "./Stadistics2.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StadisticsCategory(){
    const data = [
        {
            name: 'Tecnología',
            Categoria: 22035,
        },
        {
            name: 'Moda',
            Categoria: 15146,
        },
        {
            name: 'Hogar',
            Categoria: 12791,
        },
        {
            name: 'Bioseguridad',
            Categoria: 12338,
        },
    ];

    return(
        <div className="Stadistics2">
            <h3 className="StadisticsT">Categorias más Visitadas</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="Categoria" stroke="#8C004B" activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StadisticsCategory;