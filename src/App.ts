import express, { Express, Request, Response } from 'express';
import path from 'path';
import request from 'request';

const app: Express = express();
const port: Number = 3000;

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.get('/', (req: Request, res: Response) => {
    res.render('index', { endereco: null } );
});

app.get('/consultar-cep', (req: Request, res: Response) => {
    const { cep } = req.query;
    request(`https://viacep.com.br/ws/${cep}/json/`, (error, response, body) => {
        res.render('index', { endereco: JSON.parse(body) });
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});