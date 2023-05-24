/*
  Задача 1
  Создать простой сервер, который отвечал бы по запросам на точку api и отдавал бы массив пользователей в виде json.
  Для этого было первым дело выполнено задание 2 - создать интерфейс пользователя с заданными полями.
  Работоспособность можно проверить, перейдя по ссылке http:localhost:5000/api/users.
  Сборка и запуск сервера осуществляется через команды в файле package.json.
*/
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

/* 
  Задача 3 - создать функцию, которая складывает два числа.
  С ее работоспособностью можно ознакомиться, перейдя по ссылке http:localhost:5000/api/sumFunction.
*/
function add(a: number, b: number): number {
  return a + b;
}

/* 
  Задача 4 - создать middleware функцию, которая логирует каждый входящий запрос.
  В логах должны быть: метод запроса, url, дата запроса.
*/
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