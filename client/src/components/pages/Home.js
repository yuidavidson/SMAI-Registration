import React, {useEffect} from 'react';

const Home = ({user}) => {
  useEffect(() => {
    console.log('home page');
  }, []);
  return <section>
    <h1>Home</h1>
    {user ?
      <div>
        <p>Welcome {user.name} ({user.email})!</p>
        <p>You can update your own details</p>
        <p>You can see upcoming camps/events (like work parties) and register for them</p>
      </div> :
      <p>You are not logged in. Please log in first</p>
    }
  </section>
};

export default Home;