import React, {useEffect, useState} from 'react';
import api from "../../api/api";
import CamperSection from "./CamperSection";
import {camperSectionUtils} from "../../models/camper";

const Camper = ({isMe=false, camperId=null}) => {
  // use K for kamper, so it is NOT too fearfully close in spelling to the React component Camper
  const [kamper, setKamper] = useState(null);

  const loadKamper = () => {
    //setIsLoading(true);
    (isMe ?
      api.run('camper/current') :
      api.run('camper', {id: camperId})
    )
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
    <h1>Update {isMe ? 'My': `${kamper.firstName} ${kamper.lastName}`} Info</h1>
    {camperSectionUtils.getAllIds().map(k =>
      <CamperSection key={k} config={camperSectionUtils.getConfig(k)} camper={kamper}/>
    )}
  </section>
};

export default Camper;