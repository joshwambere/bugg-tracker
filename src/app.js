/* eslint-disable import/no-cycle */
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http'
import UsersRoute from './routes/users';
import BugsRoute from './routes/bugs';
import cors from 'cors'
const fs = require('fs')


dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'pug');
app.use(express.static('../public'))
app.use('/views/pages', express.static('public'))
// routes
app.get('/', (req, res) => {
  res.sendFile('/home/johnson/andela/projects/Bugg tracker/public/views/pages/index.html');
});

app.use('/users', UsersRoute);
app.use('/bugs', BugsRoute);
export { app };

export default server;
