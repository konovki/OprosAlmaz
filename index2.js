const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http);

app.use(cors());

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('NewMessage', msg => {
    io.emit('update-chat', msg);
  });
});

app.get('/', (req, res) => res.send('api-server is ready to work!'));

http.listen(8080, () => console.log('Example app listening on port 8080'));
