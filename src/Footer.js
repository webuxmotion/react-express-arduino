import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Context } from './Context';

const socket = io();

function App() {
  const { data, setData } = useContext(Context);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('data', function(prop) {
      
      setData({
        ...data,
        ...JSON.parse(prop)
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [socket]);

  useEffect(() => {
    socket.emit('lalajs');
  }, []);

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
    </div>
  );
}

export default App;