import React, {useEffect} from 'react';

const Home = ({camper}) => {
  useEffect(() => {
    console.log('home page');
  }, []);
  return <section>
    <h1>Home</h1>
    {camper ? <div>Camper: {camper.firstName} {camper.lastName}</div> : null}
  </section>
};

export default Home;