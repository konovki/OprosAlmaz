const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http);
const PORT = 8080;
app.use(express.static('public'));

let currentQuestion = '';

io.on('connection', (socket) => {
    console.log('Новый пользователь подключен');

    // Отправляем текущий вопрос новому пользователю
    socket.emit('question', currentQuestion);

    // Слушаем выбор вопроса от администратора
    socket.on('selectQuestion', (question) => {
        // currentQuestion = question;
        io.emit('question', question); // Отправляем всем подключенным клиентам
    });
    socket.on('UserAnswerPackage',(UserAnswerPackage)=>{io.emit('UserAnswerPackage',UserAnswerPackage)})
    socket.on('Button', (msg) => {
        console.log('Button Message received: ' + msg);
        io.emit('Admin',101);
                                });
    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

http.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
