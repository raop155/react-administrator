import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { List } from './List';
import socket from 'socket';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const [status, setStatus] = useState(() => sessionStorage.getItem('roomStatus') === "1");
  const [clients, setClients] = useState([]);
  const changeLiveMode = ({ socketId, status, options }) => {
    console.log('changeLiveMode', socketId, status, options);
    socket.emit('change-live-mode', { socketId, status, options });
  };

  const changeScreen = ({ socketId, command }) => {
    console.log('changeScreen', socketId, command);
    socket.emit('command', { socketId, command });
  };

  const getUserName = () => {
    return sessionStorage.getItem('userName');
  };

  const logOut = () => {
    sessionStorage.clear()
    history.push('/');
  };

  const changeStatus = () => {
    const SET_ROOM_STATUS_URL = `${process.env.REACT_APP_HOST}/pxgp_videocall/api/rooms/update.php`

    const params = JSON.stringify({
      id: sessionStorage.getItem("roomId"),
      status: status ? 0 : 1
    })

    fetch(SET_ROOM_STATUS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: params
    })
      .then(res => res.json())
      .then(res => console.log(res))

    setStatus(prev => !prev);
  }

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
      <div className={styles.status}>
        <button className={`button ${status ? "success" : "danger"}`} onClick={changeStatus}>
          {status ? "Online" : "Busy"}
        </button>
      </div>
      <div className={styles.user}>
        <div>{getUserName()}</div>
        <button className='button primary' onClick={logOut}>
          &times;
        </button>
      </div>
      <List clients={clients} changeLiveMode={changeLiveMode} changeScreen={changeScreen} />
    </main>
  );
};

export default Dashboard;
