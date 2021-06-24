import express from "express";
import cors from 'cors';

import routes from './routes/index.routes';

const app = express();

app.set('port', 4000 )
app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send({message: "Hello World"})
})

app.use('/api/v1',routes);

export { app };