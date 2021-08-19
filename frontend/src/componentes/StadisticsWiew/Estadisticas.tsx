import "./StadisticsView.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Estadisticas() {

    const data = [
        {
            name: 'Agosto',
            Egresos: 8294,
            Ingresos: 8627,
            amt: 2210,
        },
        {
            name: 'Septiembre',
            Egresos: 23737,
            Ingresos: 14999,
            amt: 2290,
        },
        {
            name: 'Octubre',
            Egresos: 14555,
            Ingresos: 20505,
            amt: 2000,
        },
        {
            name: 'Noviembre',
            Egresos: 38907,
            Ingresos: 37881,
            amt: 2181,
        },
        {
            name: 'Diciembre',
            Egresos: 31052,
            Ingresos: 65134,
            amt: 2500,
        },
        {
            name: 'Enero',
            Egresos: 3490,
            Ingresos: 4300,
            amt: 2100,
        },
        {
            name: 'Febrero',
            Egresos: 52759,
            Ingresos: 21724,
            amt: 2400,
        },
        {
            name: 'Marzo',
            Egresos: 13917,
            Ingresos: 65664,
            amt: 2210,
        },
        {
            name: 'Abril',
            Egresos: 14555,
            Ingresos: 43020,
            amt: 2290,
        },
        {
            name: 'Mayo',
            Egresos: 32408,
            Ingresos: 65858,
            amt: 2000,
        },
        {
            name: 'Junio',
            Egresos: 30936,
            Ingresos: 71952,
            amt: 2181,
        },
        {
            name: 'Julio',
            Egresos: 40622,
            Ingresos: 24629,
            amt: 2400,
        },
    ];
    
    return(
        <div className="StadisticsView2">
            <h3 className="StadisticsTitle">Análisis de ventas</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="Ingresos" stroke="#008F29" activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Egresos" stroke="#F95959" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Estadisticas;