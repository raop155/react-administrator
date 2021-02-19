import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const ListItem = ({
  branchId,
  description,
  deviceId,
  id,
  liveMode,
  liveModeMN,
  liveModePWD,
  liveModeUSER,
  meetingStatus,
  mn,
  pwd,
  room,
  roomId,
  screen,
  socketId,
  status,
  userId,
  changeLiveMode,
  changeScreen
}) => {
  const [loading, setLoading] = useState({ liveMode: false, screen: false });

  const handleChangeLiveMode = () => {
    if (!socketId) return;
    changeLiveMode({
      socketId,
      status: !liveMode,
      options: {
        liveModeMN: mn,
        liveModePWD: pwd,
        liveModeUSER: sessionStorage.getItem("userId")
      }
    });
    setLoading({ ...loading, liveMode: true });
  };

  const handleChangeScreen = () => {
    if (!socketId) return;
    changeScreen({ socketId, command: screen === 'home' ? 'videocall' : 'home' });
    setLoading({ ...loading, screen: true });
  };

  const isLiveModeWithMe = () => {
    return liveModeUSER === sessionStorage.getItem("userId");
  }

  useEffect(() => {
    setLoading((prev) => ({ ...prev, liveMode: false }));
  }, [liveMode]);

  useEffect(() => {
    setLoading((prev) => ({ ...prev, screen: false }));
  }, [screen]);

  return (
    <div className={`${styles.component} ${!!socketId && styles['component--active']}`}>
      <div>
        <div className={`${styles.circle} ${socketId && styles['circle--active']}`}></div>
      </div>
      <div>
        <div>{description}</div>
      </div>
      <div>
        <div className={styles.break}>
          <a href={room} target='_blank' rel='noreferrer'>
            {room}
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
              {loading.liveMode ? '...' : liveMode ? `ON ${isLiveModeWithMe() ? "w/ ME" : ""}` : `OFF`}
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
