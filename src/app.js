/* eslint-disable import/no-cycle */
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http'
import CourseRoute from './routes/course';
import StudentRoute from './routes/Student';
import cors from 'cors'


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


// routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome campus' });
});

app.use('/courses', CourseRoute);
app.use('/students', StudentRoute);
export { app };

export default server;
