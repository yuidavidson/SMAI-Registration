import React from 'react';

import {Link, useLocation} from "react-router-dom";
import logo from '../assets/logo.jpg';
import {makeUrl, navMap} from "../nav-utils";

const Navigation = ({currentUser}) => {
  const routerLocation = useLocation();
  return(
    <nav className="header" aria-label='Main nav'>
      <div className="header-top">
        <img src={logo} alt="Logo"/>
        {currentUser && <span>{currentUser.name} ({currentUser.email})</span>}
        {['/home', '/events'].map(url => ({path: makeUrl(url), title: navMap[url].title})).map(p =>
          (routerLocation.pathname === p.path) ?
            <span key={p.path} className='a-text-only'>{p.title}</span> :
            <Link key={p.path} to={p.path}>{p.title}</Link>
        )}
      </div>
      <div className="header-bottom">
       breadcrumbs
      </div>
    </nav>
  )
};

export default Navigation;
