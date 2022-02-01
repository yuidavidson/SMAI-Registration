/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Camper from './pages/Camper';
import Session from './pages/Session';

import api from "../api/api";

import LoadingSpinner from './LoadingSpinner';

import '../styles/app.css';
import Navigation from "./Navigation";
import {makeUrl} from "../utils/nav-utils";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loadingText, setLoadingText] = useState(null);

  useEffect(() => {
    api.setAuthUserSetter(setAuthUser);
    api.setLoadingTextSetter(setLoadingText);
  }, []);

  /**
   * @param {Event} e
   */
  const onCheckLoggedInClicked = (e) => {
    e.preventDefault();
    checkLoggedIn(true);
  };

  const checkLoggedIn = (isManual=false) => {
    if (isManual) {
      api.setLoadingText('checking...');
    }
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
      <LoadingSpinner text={loadingText} textSetter={setLoadingText}/>
      <Navigation user={authUser} />
      <main>
        {authUser ?
        <Routes>
          <Route path={makeUrl('/')} exact element={<Home user={authUser}/>}/>
          <Route path={makeUrl('/me')} exact element={<Camper me={authUser}/>} />
          <Route path={makeUrl('/events')} element={<Events />}/>
          <Route path={makeUrl('/register/:eventId')} element={<Register/>}/>

          <Route path={makeUrl('/register/:eventId/:camperId')} element={<Camper />}/>
          <Route path={makeUrl('/register/:eventId/:camperId/info')} element={<Camper />}/>
          <Route path={makeUrl('/register/:eventId/:camperId/sessions')} exact element={<Session />}/>

          <Route path='*' element={<NotFound />}/>
        </Routes>
          :
        loginBox
      }</main>
    </div>
  );
};

/*
 /events => /register/mill2020/
 /register/mill2022/1234/


* */
export default App;