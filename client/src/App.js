import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const socket = io();

function App() {

  const promptRef = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    socket.on('write_accept', (msg) => {
      setMessage(
        <p>Accept!!</p>
      );
    });
    socket.on('write_result', (msg) => {
      setMessage(
        <>
          <p>Result!!</p>
          <p>{msg.data.prompt}</p>
        </>
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('write_request', {prompt: promptRef.current.value});
  };

  return (
    <div className="App">
      <header>
        <h1>React SocketIO Celery Example</h1>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control type="text" ref={promptRef}/>
            <Button variant="primary" type="submit">Process</Button>
          </InputGroup>
        </Form>
      </header>
      <main>
        <p className="usage">After 10 seconds of pressing the button, you will see the results below.</p>
        {message}
      </main>
    </div>
  );
}

export default App;
