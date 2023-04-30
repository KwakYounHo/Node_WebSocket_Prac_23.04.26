import { Server }        from 'socket.io';
import http              from 'http';
import fs                from 'fs';
import path              from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirName  = path.dirname(__fileName);
const root       = path.join(__dirName);

const server = http.createServer((req,rep)=>{
  
  function getMIME() {
    switch (true) {
      case req.url.endsWith('.html') :
        return 'text/html'
      case req.url.endsWith('.js') :
        return 'text/javascript'
      case req.url.endsWith('.css') :
        return 'text/css'
    }
  }
  
  function ARep(statusCode, write, type=getMIME()) {
    rep.writeHead(statusCode, {'Content-Type':`${type}; charset=utf-8`});
    if (write.endsWith('.html') || write.endsWith('js') || write.endsWith('.css')) {
      rep.write(fs.readFileSync(path.join(root, write)));
    } else {
      rep.write(write);
    }
    rep.end();
  }

  switch (req.method) {
    
    case 'GET' :
      if (req.url === '/') {
        return ARep(200, 'index.html', 'text/html');
      }
      return ARep(200, req.url);
    case 'POST' :
  }
})
  .listen(8080, err => {
    if (err) throw err;
    console.log('AppServer running...');
  })
const io = new Server(server);

io.on('connection', socket => {
  const req      = socket.request;
  const socketIP = req.connection.remoteAddress;

  socket.on('EnterUser', data => {
    io.emit('GoodDay', data)
  })
  socket.on('chat', data => {
    io.emit('chat', data);
  })
})