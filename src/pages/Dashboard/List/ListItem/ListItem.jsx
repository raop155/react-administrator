import React from 'react';
import styles from './styles.module.scss';

const ListItem = ({ index, id, location, campaign, url, liveMode }) => {
  return (
    <div className={styles.component}>
      <div className={styles.orderNumber}>
        <div>{index + 1}</div>
      </div>
      <div>
        <div>{id}</div>
      </div>
      <div>
        <div>{location}</div>
      </div>
      <div>
        <div>{campaign}</div>
      </div>
      <div>
        <div className={styles.break}>
          <a href={url} target='_blank' rel='noreferrer'>
            {url}
          </a>
        </div>
      </div>
      <div>
        <div>
          <button className={liveMode ? `button primary` : `button `}>
            {liveMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
