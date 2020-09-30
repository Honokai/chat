var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html')
});

io.on('connection', (socket) => {
  socket.on('message', (grupo, nome, conteudo) => {
    socket.broadcast.emit('message', grupo, `${nome} ${conteudo}`)
  })
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});