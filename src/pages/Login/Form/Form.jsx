import React from 'react';
import styles from './styles.module.scss';

const Form = () => {
  return (
    <div className={`${styles.component} container`}>
      <div className={styles.form}>
        <h1>Telecaptador</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='user'>Usuario</label>
            <input
              type='text'
              name='user'
              id='user'
              inputMode='text'
              autoFocus
              spellCheck={false}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='user'>Contraseña</label>
            <input type='password' name='password' id='password' inputMode='text' />
          </div>

          <div className='form-group'>
            <button className={`button primary`}>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
