import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(routes);


const PORT = process.env.PORT || 8877

app.listen(PORT);