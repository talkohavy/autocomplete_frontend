import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  //------------------- Render GUI ----------------------
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/shop'>Shop</Link>
    </footer>
  );
}
