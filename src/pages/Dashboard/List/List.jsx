import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { ListItem } from './ListItem';

const List = ({ clients, changeLiveMode, changeScreen }) => {
  const [devices, setDevices] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDevicesByUserId = () => {
      const userId = sessionStorage.getItem('userId') || null;
      const GET_DEVICES_URL = `${process.env.REACT_APP_HOST}/pxgp_videocall/api/usersDevices/getByUserId.php?userId=${userId}`
      fetch(GET_DEVICES_URL)
        .then(res => res.json())
        .then(res => {
          setData(res)
          console.log("query data changed!");
        })
    }

    getDevicesByUserId()
  }, [])

  useEffect(() => {
    const mergeData = () => {
      if (clients && data.length > 0) {
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
      }
    }

    mergeData()
  }, [clients, data]);


  return (
    <div className={styles.component}>
      <div className={`container ${styles.table}`}>
        <h1>Equipos Conectados</h1>
        <div className={styles.tableData}>
          <div className={styles.headers}>
            <div>
              <div>Status</div>
            </div>
            <div>
              <div>Description</div>
            </div>
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
          {devices.length > 0 && devices.map((item, index) => (
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
