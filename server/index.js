const celery = require('celery-node');
const { Server } = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || '3001';
const io = new Server(port);

const client = celery.createClient(
  process.env.CELERY_BROKER_URL,
  process.env.CELERY_RESULT_BACKEND
);

io.on('connection', (socket) => {
  socket.on('write_request', (msg) => {
    const task = client.createTask('tasks.example');
    const result = task.applyAsync([msg.prompt]);
    result.get().then(data => {
      socket.emit('write_result', {result: true, data: data});
    });
    socket.emit('write_accept', {result: true});
  });
});
