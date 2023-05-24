const changeBackgroundColorButton = document.getElementById('btn');
const background = document.getElementsByTagName('body')[0];
const fetchButton = document.getElementById('fetch');
const responseList = document.getElementById('response_array');
const container = document.getElementById('container');
const tooltip = document.getElementsByClassName('tooltip')[0];
const tooltipWindow = document.getElementsByClassName('tooltip_window')[0];

/* 
    Задача 1 - поменять цвет фона на странице на случайный из заданного
    списка цветов при нажатии на кнопку.
    Для взятия случайного значения была использована функция стандартного класса Math.
*/
const colors = ['red', 'blue', 'green', 'yellow', 'wheat'];
changeBackgroundColorButton.addEventListener('click', () => {
    background.style.backgroundColor = colors[Math.floor(Math.random() * 5)];
});

/* 
    Задача 2 - сделать асинхронную функцию, которая возвращает Promise.
    Обработать входящий результат с URl, представленного в задании.
    В данном случае все 100 объектов, приходящих ответом с сервера, я помещаю в 
    ненумерованный список.
*/
async function getAPIResponse(){
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    return response.ok ? response.json() : response.status;
}

fetchButton.addEventListener('click', () => {
    getAPIResponse()
    .then((result) => {
        result.forEach((object) => {
            let objectData = document.createElement('li');
            objectData.innerHTML = object.id + ' ' + object.title;
            responseList.appendChild(objectData);
        })
    })
    .catch((error => {
        console.log(error);
    }));
});

/* 
    Задача 3 - сделать контейнер с кнопками, при нажатии на которые они бы выделялись и наоборот.
    Использовать делегирование событий.
    Был использован метод toggle у свойства classList, которое ведет себя как методы add и remove в зависимости 
    от наличия или отсутствия класса.
*/
container.addEventListener('click', (event) => {
    if(!event.target.classList.contains('item')) return;
    event.target.classList.toggle('selected');
});


/* 
    Задача 4 - добавить элемент с атрибутом data-tooltip, при наведении на который показывается
    всплывающая подсказка с текстом, указанным в этом атрибуте. Подсказка должна быть позиционирована
    относительно курсора мыши.
    Использовались свойства события, такие как pageX, pageY. Для скрытия и показа подсказки используется свойство
    hidden.
*/
tooltip.addEventListener('mousemove', (event) => {
    tooltipWindow.style.left = event.pageX + "px";
    tooltipWindow.style.top = event.pageY + "px"; 
    tooltipWindow.innerHTML = tooltip.dataset.tooltip;
    tooltipWindow.hidden = false;
});

tooltip.addEventListener('mouseout', () => {
    tooltipWindow.hidden = true;
})

