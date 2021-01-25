import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { List } from './List';
import socket from 'socket';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const changeLiveMode = ({ socketId, status }) => {
    console.log('changeLiveMode', socketId, status);
    socket.emit('change-live-mode', { socketId, status });
  };

  const changeScreen = ({ socketId, command }) => {
    console.log('changeScreen', socketId, command);
    socket.emit('command', { socketId, command });
  };

  const getUserName = () => {
    return sessionStorage.getItem('userName');
  };

  const logOut = () => {
    const userId = sessionStorage.getItem('userId');
    insertLogoutLog(userId);
    history.push('/');
  };

  const insertLogoutLog = (userId) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('type', 'LOGOUT');

    fetch(`${process.env.REACT_APP_HOST}/pxgp_auth/php/login/createLogin.php`, {
      method: 'POST',
      body: formData,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      });

    sessionStorage.removeItem('userId');
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
    <main id='dashboard' className={styles.component}>
      <div className={styles.user}>
        <div>{getUserName()}</div>
        <button className='button primary' onClick={logOut}>
          Cerrar sesión
        </button>
      </div>
      <List clients={clients} changeLiveMode={changeLiveMode} changeScreen={changeScreen} />
    </main>
  );
};

export default Dashboard;
