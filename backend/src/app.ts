import express from "express";
import cors from 'cors';

import routes from './routes/index.routes';

const app = express();

app.set('port', 4000 )
app.use(express.json());
app.use(cors());

app.use('/',routes);

export default app;