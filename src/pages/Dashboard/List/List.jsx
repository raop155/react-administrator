import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { ListItem } from './ListItem';

const data = [
  {
    branchId: 'LAB',
    deviceId: '001',
    location: 'Jumbo Mall la Dehesa',
    campaign: 'OMO',
    url: 'https://zoom.us/j/9499064847',
    screen: 'home',
    liveMode: false,
    meetingStatus: null,
  },
  {
    branchId: 'LAB',
    deviceId: '002',
    location: 'Done PX Test',
    campaign: 'OMO',
    url: 'https://zoom.us/j/9499064847',
    screen: 'home',
    liveMode: false,
    meetingStatus: null,
  },
];

const List = ({ clients, changeLiveMode, changeScreen }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    console.log('change clients');
    console.log('data', data);
    const items = data.map((item) => {
      let newItem = clients.find((client) => {
        return client.branchId === item.branchId && client.deviceId === item.deviceId;
      });

      if (newItem) {
        return (newItem = {
          ...item,
          ...newItem,
        });
      } else {
        return (newItem = {
          ...item,
        });
      }
    });

    console.log('items', items);
    setDevices(items);
  }, [clients]);

  return (
    <div className={styles.component}>
      <div className={`container ${styles.table}`}>
        <h1>Equipos Conectados</h1>
        <div className={styles.tableData}>
          <div className={styles.headers}>
            {/* <div className={styles.orderNumber}>
              <div>#</div>
            </div> */}
            <div>
              <div>Status</div>
            </div>
            {/* <div>
              <div>ID</div>
            </div> */}
            <div>
              <div>Ubicación</div>
            </div>
            {/* <div>
              <div>Campaña</div>
            </div> */}
            <div>
              <div>Room</div>
            </div>
            <div>
              <div>Modo Live</div>
            </div>
            <div>
              <div>Comando</div>
            </div>
          </div>
          {devices.map((item, index) => (
            <ListItem
              key={`${item.branchId}${item.deviceId}`}
              index={index}
              {...item}
              changeLiveMode={changeLiveMode}
              changeScreen={changeScreen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
