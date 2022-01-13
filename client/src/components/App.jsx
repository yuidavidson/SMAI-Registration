/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Camper from './pages/Camper';
import Session from './pages/Session';

import api from "../api/api";
import CamperModel from "../models/camper";

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

const makeUrl = path => `/app-registration/client/dist${path}`;
const App = () => {


  const [camper, setCamper] = useState(null);
  const [session, setSession] = useState(sessionX);
  const [sessionReg, setSessionReg] = useState(sessionRegX);

  // initial render of App (with no deps, hence it will only change/have effect ONCE)
  useEffect(() => {
    api.run('camper/current')
      .then((response) => {
        const newCamper = new CamperModel(response.data);
        setCamper(newCamper);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('app');
  });

  return (<BrowserRouter>
    <div className='app'>
      <nav aria-label='Main nav'>
        <Link to={makeUrl('/events')}>Home</Link>
        <Link to={makeUrl('/events')}>Events</Link>
        <Link to={makeUrl('/register')}>Register for event</Link>
        <Link to={makeUrl('/register/camper')}>Register: camper info</Link>
        <Link to={makeUrl('/register/camper/session')}>Register: camper session info</Link>
      </nav>
      <main>
      <Routes>
        <Route path={makeUrl('/events')} element={<Events camper={camper} />}></Route>
        <Route path={makeUrl('/register')} exact element={<Register />}></Route>
        <Route path={makeUrl('/register/camper')} exact element={<Camper />}></Route>
        <Route path={makeUrl('/register/camper/session')} exact element={<Session session={sessionX} sessionReg={sessionRegX} />}></Route>
        <Route path='*' element={<Home camper={camper}/>}></Route>
      </Routes>
      </main>
    </div>
  </BrowserRouter>)
};

export default App;