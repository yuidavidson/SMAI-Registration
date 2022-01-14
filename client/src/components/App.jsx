/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React, {useState, useEffect} from 'react';
import {Routes, Route, Link} from "react-router-dom";

import Home from './pages/Home';
import Events from './pages/Events';
import Register from './pages/Register';
import Camper from './pages/Camper';
import Session from './pages/Session';
import CamperDetails from "./pages/CamperDetails";

import api from "../api/api";
import CamperModel from "../models/camper";

import '../styles/app.css';

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

const makeUrl = path => `/app${path}`;

const pageTitleMap = {
  '/home': {title: 'Home', bcrumb: ''},
  '/events': {title: 'Events/Camps', bcrumb: 'Events/Camps'},
  '/register': {title: 'Register for Event/Camp', bcrumb: 'Register'},
  '/register/camper': {title: 'Register Camper', bcrumb: 'Camper'},
  '/register/camper/details': {title: 'Camper Details', bcrumb: 'Details'},
  '/register/camper/sessions': {title: 'Camper Sessions', bcrumb: 'Sessions'},
};
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

  return (
    <div className='app'>
      <nav aria-label='Main nav'>
        {Object.keys(pageTitleMap).map(page =>
          <Link key={page} to={makeUrl(page)}>{pageTitleMap[page].title}</Link>
        )}
      </nav>
      <main>
      <Routes>
        <Route path={makeUrl('/events')} element={<Events camper={camper} />} />
        <Route path={makeUrl('/register')} exact element={<Register />} />
        <Route path={makeUrl('/register/camper')} exact element={<Camper />} />
        <Route path={makeUrl('/register/camper/details')} exact element={<CamperDetails />} />
        <Route path={makeUrl('/register/camper/session')} exact element={<Session session={sessionX} sessionReg={sessionRegX} />} />
        <Route path='*' element={<Home camper={camper}/>} />
      </Routes>
      </main>
    </div>
  );
};

export default App;