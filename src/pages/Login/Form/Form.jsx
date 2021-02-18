import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

const Form = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const LOGIN_URL = `${process.env.REACT_APP_HOST}/pxgp_videocall/api/users/login.php?user=${inputs.user}&password=${inputs.password}`

    fetch(LOGIN_URL)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        const user = data[0];
        if (user.id) {
          sessionStorage.setItem('userId', user.id);
          sessionStorage.setItem('userName', user.name);
          sessionStorage.setItem('userLastName', user.lastName);
          sessionStorage.setItem('userDocument', user.userDocument);
          sessionStorage.setItem('roomId', user.roomId);
          sessionStorage.setItem('roomStatus', user.roomStatus);

          history.push('/dashboard');
        } else {
          throw new Error('User or password invalid');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };


  return (
    <div className={`${styles.component} container`}>
      <div className={styles.form}>
        <h1>Telecaptador</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='user'>Usuario</label>
            <input
              type='text'
              name='user'
              id='user'
              inputMode='text'
              autoFocus
              spellCheck={false}
              onChange={handleChange}
              value={inputs.user}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='user'>Contraseña</label>
            <input
              type='password'
              name='password'
              id='password'
              inputMode='text'
              onChange={handleChange}
              value={inputs.password}
            />
          </div>

          {error && (
            <div className='form-group'>
              <div className={styles.error}>{error}</div>
            </div>
          )}

          <div className='form-group'>
            <button className={`button primary`}>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
