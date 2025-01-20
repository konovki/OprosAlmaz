const http = require('http');

const hostname = '195.133.196.45';
const port = 80;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});
const io = socketIo(server);

const PORT = 80;//process.env.PORT;// || 3001;

app.use(express.static('public')); // Раздача статических файлов из папки public

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

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
