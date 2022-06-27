import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import MyStyles from './header.module.css';
import AppStyles from '../app.module.css';

export default function Header({}) {
  //------------------- Render GUI ----------------------
  return (
    <header className={clsx(MyStyles.header, AppStyles.flexCenter)}>
      <nav className={clsx(MyStyles.navBar, AppStyles.flexAround)}>
        <Link to='/' className={MyStyles.navLink}>
          Home
        </Link>
        <Link to='/about' className={MyStyles.navLink}>
          About
        </Link>
      </nav>
    </header>
  );
}
