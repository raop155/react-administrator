import React, { useEffect } from 'react';
import socket from 'socket';

const Test = () => {
  const addClient = () => {
    console.log('addClient');
    socket.emit('client-id', {
      branchId: 'LAB',
      deviceId: '001',
      screen: sessionStorage.getItem('screen') || 'home',
      liveMode: localStorage.getItem('videoCallLiveMode') === 'true' || false,
      meetingStatus: null,
    });
  };

  const ChangeMode = (status) => {
    console.log('ChangeMode', status);
    socket.emit('live-mode', {
      status,
    });
  };

  useEffect(() => {
    socket.on('change-meeting-status', ({ socketId, status }) => {
      if (socketId === socket.id) {
        ChangeMode(status);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={addClient}> Add New Client </button>
      <button onClick={() => ChangeMode(true)}> Change Live Mode </button>
      <button onClick={() => ChangeMode(false)}> Change No Live Mode </button>
    </div>
  );
};

export default Test;
