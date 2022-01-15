import React from 'react';

import {Link, useLocation} from "react-router-dom";
import logo from '../assets/logo.jpg';
import {makeUrl, navMap} from "../nav-utils";

const Navigation = ({currentUser}) => {
  const location = useLocation();
  return(
    <nav className="header" aria-label='Main nav'>
      <div className="header-top">
        <img src={logo} alt="Logo"/>
        {currentUser && <span>{currentUser.name} ({currentUser.email})</span>}
        {['/home', '/events'].map(url =>
          (location.path === url) ?
            <span class='link'>{navMap[url].title}</span> :
            <Link key={url} to={makeUrl(url)}>{navMap[url].title}</Link>
        )}
      </div>
      <div className="header-bottom">
       breadcrumbs
      </div>
    </nav>
  )
};

export default Navigation;
