import React from 'react';

import {Link, useLocation} from "react-router-dom";
import logo from '../assets/logo.jpg';
import {makeUrl, navMap} from "../utils/nav-utils";

const Navigation = ({user}) => {
  const routerLocation = useLocation();
  return(
    <nav className="header" aria-label='Main nav'>
      <div className="header-top">
        <div className=''><img src={logo} alt="Logo"/></div>
        <div className='flexy-child-grow'>
          <div className='flexy'>{['/', '/me', '/events'].map(url => ({
            path: makeUrl(url),
            title: (url === '/me' ? (user ? user.name : 'Anonymous') : navMap[url].title),
            isCurrent: routerLocation.pathname === makeUrl(url)
          })).map(p =>
              <Link key={p.path} to={p.path} className={p.isCurrent ? 'current':''}>{p.title}</Link>
          )}</div>
        </div>
      </div>
      <div className="header-bottom">
       breadcrumbs
      </div>
    </nav>
  )
};

export default Navigation;
