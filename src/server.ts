import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(routes);


const PORT = process.env.PORT || 8877

app.listen(PORT);