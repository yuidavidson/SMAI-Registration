/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";

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

const sessionX = {
  "name": 'name',
  "organizer": 'organizer',
  "campId": 'campId',
  "startDate": 'startDate',
  "endDate": 'endDate',
  "minQuota": 'minQuota',
  "maxQuota": 'maxQuota',
  "notes": 'notes',
  "internalName": 'internalName'
};
const sessionRegX = {
  "registrationId": 'registrationId',
  "sessionId": 'sessionId',
  "mealId": 'mealId',
  "foodPreferenceId": 'foodPreferenceId',
  "crewId": 'crewId'
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCamper, setCurrentCamper] = useState(null);

  /**
   * @param {Event|null} opt_e
   */
  const loadCurrentCamper = (opt_e=null) => {
    if (opt_e) {
      opt_e.preventDefault();
    }
    setIsLoading(true);
    api.run('camper/current')
      .then((response) => {
        setIsAuth(!!response.user);
        if (response.user) {
          setCurrentUser({...response.user});
        }
        if (response.data) {
          setCurrentCamper(new CamperModel(response.data));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // initial render of App (with no deps, hence it will only change/have effect ONCE)
  useEffect(() => {
    loadCurrentCamper();
  }, []);

  useEffect(() => {
    console.log('app');
  });

  const loginBox = <div>
    <strong>You are not logged in</strong>
    <div><a href='/index.php?option=com_users&view=login' target='_blank' className='button'>Log in</a></div>
    <div><a href='#' onClick={loadCurrentCamper}>check if logged in?</a></div>
  </div>;

  return (
    <div className='app'>
      <LoadingSpinner state={isLoading} />
      <Navigation user={currentUser} />
      <main>
        {isAuth ?
        <Routes>
          <Route path={makeUrl('/events')} element={<Events camper={currentCamper}/>}/>
          <Route path={makeUrl('/register')} exact element={<Register/>}/>
          <Route path={makeUrl('/register/camper')} exact element={<Camper/>}/>
          <Route path={makeUrl('/register/camper/details')} exact element={<CamperDetails/>}/>
          <Route path={makeUrl('/register/camper/session')} exact
                 element={<Session session={sessionX} sessionReg={sessionRegX}/>}/>
          <Route path='*' element={<Home camper={currentCamper}/>}/>
        </Routes>
          :
        loginBox
      }</main>
    </div>
  );
};

export default App;