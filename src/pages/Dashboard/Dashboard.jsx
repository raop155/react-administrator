import React, { useEffect, useState } from 'react';
import { List } from './List';
import socket from 'socket';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const changeLiveMode = ({ socketId, status }) => {
    console.log('changeLiveMode', socketId, status);
    socket.emit('change-live-mode', { socketId, status });
  };

  const changeScreen = ({ socketId, command }) => {
    console.log('changeScreen', socketId, command);
    socket.emit('command', { socketId, command });
  };

  useEffect(() => {
    socket.emit('clients');
    socket.on('clients', (clients) => {
      console.log(clients);
      setClients(clients);
    });

    return () => {
      socket.off('clients');
    };
  }, []);

  return (
    <main id='dashboard'>
      <List clients={clients} changeLiveMode={changeLiveMode} changeScreen={changeScreen} />
    </main>
  );
};

export default Dashboard;
