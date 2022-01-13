/*
  Components still needed:
  Payment
    Custom Pricing - amount and reason

  TODO: make it so that when you move back to register, currentCamper is reset
        make it so each event is separated so the parties are not the same for all events
*/

import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Events from './Events';
import Home from './Home';

// import CampEvents from './CampEvents.jsx';
// import Navigation from './Navigation.jsx';
// import Register from './Register.jsx';
// import Camper from './Camper.jsx';
// import CamperInfoStep from './CamperInfoStep.jsx';
// import Neighborhood from './Neighborhood.jsx';
// import Sessions from './Sessions.jsx';
// import Stripe from './Stripe.jsx';

// import CamperModel from '../models/camper';
// import api from '../api/api';

const App = () => {
  const rootUrl = '/app-registration/client/dist';
  return (<BrowserRouter>
    <div className='app'>
      <nav aria-label='Main nav'>
        <Link to={`${rootUrl}/events`}>Events</Link>
        <Link to={`${rootUrl}/home`}>Home</Link>
      </nav>
      <Routes>
        <Route path={`${rootUrl}/events`} element={<Events />}></Route>
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </div>
  </BrowserRouter>)
};

export default App;