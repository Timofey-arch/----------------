"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const apiRouter = express_1.default.Router();
const users = [
    { id: 1, name: "Tom", email: "tom@mail.ru" },
    { id: 2, name: "Alice", email: "alice@gmail.com" },
    { id: 3, name: "Bob", email: "bob@mail.su" }
];
function add(a, b) {
    return a + b;
}
app.use(function (req, _, next) {
    console.log('| Method - ' + req.method + ' | URL - ' + req.url + ' | Date - ' + new Date() + '|');
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
        result: add(2, 5)
    });
});
app.use('/api', apiRouter);
app.listen(5000, () => console.log('Server has been started'));
