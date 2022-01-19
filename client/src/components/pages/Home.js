import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {makeUrl} from "../../utils/nav-utils";

const Home = ({user}) => {
  useEffect(() => {
    console.log('home page');
  }, []);
  return <section>
    {user &&
      <div>
        <h1>Dear {user.name} ({user.email}),</h1>
        <p>In this part of the website you can:</p>
        <ul>
          <li><Link to={makeUrl('/me')}>update your own information</Link></li>
          <li>see upcoming <Link to={makeUrl('/events')}>camps/work-parties</Link> and register for them</li>
        </ul>
      </div>
    }
  </section>
};

export default Home;