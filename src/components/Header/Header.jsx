import React from 'react';
import styles from './styles.module.scss';
import Logo from '../../assets/logo.jpg';

const Header = () => {
  return (
    <header className={styles.component}>
      <img src={Logo} alt='Px Group' />
    </header>
  );
};

export default Header;
