import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';

import Home from './pages/Home';
import About from './pages/About';

import MyStyles from './app.module.css';

export default function App() {
  //------------------ Render GUI -----------------------
  return (
    <>
      <Header />
      <div className={MyStyles.mainWindow}>
        <Switch>
          <Route path='/about' exact component={About} />
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </>
  );
}
