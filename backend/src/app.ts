import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

import routes from './routes/index.routes';

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 4000 )
app.use(express.json());
app.use(cors());

app.use('/',routes);

export default app;