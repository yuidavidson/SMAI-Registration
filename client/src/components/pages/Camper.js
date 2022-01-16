import React, {useEffect, useState} from 'react';
import api from "../../api/api";
import CamperModel from "../../models/camper";

const Camper = ({user=null}) => {
  // use K for kamper, so it is NOT too fearfully close in spelling to the React component Camper
  const [kamper, setKamper] = useState(null);

  const loadKamper = () => {
    //setIsLoading(true);
    api.run('camper/current', null, true)
      .then((response) => {
        // add auth-check
        if (response.data) {
          setKamper(new CamperModel(response.data));
        }
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadKamper();
  }, []);

  return <section>
    <h1>Camper</h1>
    <p>{kamper ? <div>Camper: {kamper.firstName} {kamper.lastName}</div> : null}</p>
    <h2>Personal Info</h2>
    <p>...</p>
    <h2>Contact</h2>
    <p>...</p>
    <h2>Vehicles</h2>
    <p>...</p>

  </section>
};

export default Camper;