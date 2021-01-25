import React from 'react';
import styles from './styles.module.scss';
import { Form } from './Form';

const Login = () => {
  return (
    <main id='login' className={styles.component}>
      <Form />
    </main>
  );
};

export default Login;
