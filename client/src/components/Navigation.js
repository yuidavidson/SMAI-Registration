import React from 'react';

import {Link, useLocation} from "react-router-dom";
import logo from '../assets/logo.jpg';
import {makeUrl} from "../utils/nav-utils";

const Navigation = ({user}) => {
  const routerLocation = useLocation();
  const getCurrentClass = urlPath => (routerLocation.pathname === makeUrl(urlPath) ? 'current':'');

  return(
    <nav className="header" aria-label='Main nav'>
      <div className="header-top">
        <div className=''><img src={logo} alt="Logo"/></div>
        <div className='flexy-child-grow'>
          <div className='flexy'>
            <Link to={makeUrl('/events')} className={getCurrentClass('/events')}>Events</Link>
            <Link to={makeUrl('/me')} className={getCurrentClass('/me')}>{(user ? user.name : 'My Info')}</Link>
            <Link to={makeUrl('/')} className={getCurrentClass('/')}>Help</Link>
          </div>
        </div>
      </div>
      <div className="header-bottom">
       breadcrumbs
      </div>
    </nav>
  )
};

export default Navigation;
