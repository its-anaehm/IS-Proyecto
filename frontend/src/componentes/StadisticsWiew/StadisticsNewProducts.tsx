import "./Stadistics2.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StadisticsNewProducts(){
    const data = [
        {
            name: 'Julio',
            Productos: 7500,
        },
        {
            name: 'Octubre',
            Productos: 5000,
        },
        {
            name: 'Enero',
            Productos: 10000,
        },
        {
            name: 'Abril',
            Productos: 3200,
        },
    ];
    
    return(
        <div className="Stadistics2">
            <h3 className="StadisticsT">Productos Publicados por cuatrimestre</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="Productos" stroke="#01419b" activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StadisticsNewProducts;