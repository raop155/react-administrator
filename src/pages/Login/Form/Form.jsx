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

    const formData = new FormData();
    formData.append('user_id', inputs.user);
    formData.append('password', inputs.password);
    formData.append('project_id', process.env.REACT_APP_PROJECT);

    fetch(`${process.env.REACT_APP_HOST}/pxgp_auth/php/user/getUser.php`, {
      method: 'POST',
      body: formData,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.data.id) {
          const userId = data.data.id;
          const userName = data.data.name;
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('userName', userName);
          insertLoginLog(userId);
          history.push('/dashboard');
        } else {
          throw new Error('User or password invalid');
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  const insertLoginLog = (userId) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('type', 'LOGIN');

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
