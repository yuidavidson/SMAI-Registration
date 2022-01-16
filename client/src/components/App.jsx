/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Camper from './pages/Camper';
import Session from './pages/Session';
import CamperDetails from "./pages/CamperDetails";

import api from "../api/api";
import CamperModel from "../models/camper";

import LoadingSpinner from './LoadingSpinner';

import '../styles/app.css';
import Navigation from "./Navigation";
import {makeUrl, navMap} from "../nav-utils";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    api.setLoadingSetter(setLoading);
    api.setAuthUserSetter(setAuthUser);
  }, []);

  /**
   * @param {Event} e
   */
  const onCheckLoggedInClicked = (e) => {
    e.preventDefault();
    checkLoggedIn();
  };

  const checkLoggedIn = () => {
    api.ping()
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const loginBox = <div>
    <strong>You are not logged in</strong>
    <div><a href='/index.php?option=com_users&view=login' target='_blank' className='button'>Log in</a></div>
    <div><a href='#' onClick={onCheckLoggedInClicked}>check if logged in?</a></div>
  </div>;

  return (
    <div className='app'>
      <LoadingSpinner state={isLoading} />
      <Navigation user={authUser} />
      <main>
        {authUser ?
        <Routes>
          <Route path={makeUrl('/')} exact element={<Home user={authUser}/>}/>
          <Route path={makeUrl('/me')} exact element={<Camper isMe={true} />}/>
          <Route path={makeUrl('/events')} element={<Events />}/>
          <Route path={makeUrl('/register')} exact element={<Register/>}/>
          <Route path={makeUrl('/register/camper')} exact element={<Camper/>}/>
          <Route path={makeUrl('/register/camper/details')} exact element={<CamperDetails/>}/>
          <Route path={makeUrl('/register/camper/session')} exact element={<Session />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
          :
        loginBox
      }</main>
    </div>
  );
};

export default App;