import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);


const PORT = process.env.PORT || 8877

app.listen(PORT);