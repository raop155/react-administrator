import React from 'react';
import styles from './styles.module.scss';
import { ListItem } from './ListItem';

const data = [
  {
    id: 'DONE 001',
    location: 'Jumbo Mall la Dehesa',
    campaign: 'OMO',
    room: '9499064847',
    password: '3001',
    url: 'https://zoom.us/j/9499064847',
    liveMode: false,
  },
  {
    id: 'DONE 001',
    location: 'Jumbo Mall la Dehesa',
    campaign: 'OMO',
    room: '9499064847',
    password: '3001',
    url: 'https://zoom.us/j/9499064847',
    liveMode: false,
  },
  {
    id: 'DONE 001',
    location: 'Jumbo Mall la Dehesa',
    campaign: 'OMO',
    room: '9499064847',
    password: '3001',
    url: 'https://zoom.us/j/9499064847',
    liveMode: false,
  },
  {
    id: 'DONE 001',
    location: 'Jumbo Mall la Dehesa',
    campaign: 'OMO',
    room: '9499064847',
    password: '3001',
    url: 'https://zoom.us/j/9499064847',
    liveMode: false,
  },
];

const List = () => {
  return (
    <div className={styles.component}>
      <div className={`container ${styles.table}`}>
        <h1>Equipos Conectados</h1>
        <div className={styles.tableData}>
          <div className={styles.headers}>
            <div className={styles.orderNumber}>
              <div>#</div>
            </div>
            <div>
              <div>ID</div>
            </div>
            <div>
              <div>Ubicación</div>
            </div>
            <div>
              <div>Campaña</div>
            </div>
            <div>
              <div>Room</div>
            </div>
            <div>
              <div>Modo Live</div>
            </div>
          </div>
          {data.map((item, index) => (
            <ListItem key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
