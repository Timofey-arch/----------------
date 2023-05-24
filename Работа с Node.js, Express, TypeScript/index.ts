import express, { Express } from 'express';

const app: Express = express();
const apiRouter = express.Router();

interface User {
  id: number;
  name: string;
  email: string;
}

const users: Array<User> = [
  {id: 1, name: "Tom", email: "tom@mail.ru"}, 
  {id: 2, name: "Alice", email: "alice@gmail.com"}, 
  {id: 3, name: "Bob", email: "bob@mail.su"}
];

function add(a: number, b: number): number {
  return a + b;
}

app.use(function (req, _, next) {
  console.log('| Method - ' + req.method + ' | URL - ' + req.url + ' | Date - ' + new Date() + ' |');
  next();
});

// Main user part
app.get('/', (request, response) => {
  response.send('Hello world!');
});

// REST API part
apiRouter.get('/users', (request, response) => {
  response.json(users);
});

apiRouter.get('/sumFunction', (request, response) => {
  response.json({
    argumentFirst: 2,
    argumentSecond: 5,
    result: add(2, 5)})
});

app.use('/api', apiRouter);
app.listen(5000, () => console.log('Server has been started'));