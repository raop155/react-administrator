import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const ListItem = ({
  index,
  socketId,
  branchId,
  deviceId,
  location,
  campaign,
  url,
  screen,
  liveMode,
  changeLiveMode,
  changeScreen,
}) => {
  const [loading, setLoading] = useState({ liveMode: false, screen: false });

  const handleChangeLiveMode = () => {
    if (!socketId) return;
    changeLiveMode({ socketId, status: !liveMode });
    setLoading({ ...loading, liveMode: true });
  };

  const handleChangeScreen = () => {
    if (!socketId) return;
    changeScreen({ socketId, command: screen === 'home' ? 'videocall' : 'home' });
    setLoading({ ...loading, screen: true });
  };

  useEffect(() => {
    setLoading((prev) => ({ ...prev, liveMode: false }));
  }, [liveMode]);

  useEffect(() => {
    setLoading((prev) => ({ ...prev, screen: false }));
  }, [screen]);

  return (
    <div className={`${styles.component} ${!!socketId && styles['component--active']}`}>
      {/* <div className={styles.orderNumber}>
        <div>{index + 1}</div>
      </div> */}
      <div>
        <div className={`${styles.circle} ${socketId && styles['circle--active']}`}></div>
      </div>
      {/* <div>
        <div>
          {branchId} {deviceId}
        </div>
      </div> */}
      <div>
        <div>{location}</div>
      </div>
      {/* <div>
        <div>{campaign}</div>
      </div> */}
      <div>
        <div className={styles.break}>
          <a href={url} target='_blank' rel='noreferrer'>
            {url}
          </a>
        </div>
      </div>
      <div>
        <div>
          {socketId ? (
            <button
              onClick={handleChangeLiveMode}
              className={liveMode ? `button primary` : `button `}
            >
              {loading.liveMode ? '...' : liveMode ? 'ON' : 'OFF'}
            </button>
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
      <div>
        <div>
          {socketId ? (
            <button
              onClick={handleChangeScreen}
              className={screen === 'home' ? `button primary` : `button danger`}
            >
              {loading.screen ? '...' : screen === 'home' ? 'Llamar' : 'Colgar'}
            </button>
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
