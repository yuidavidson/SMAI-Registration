import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import api from "../../api/api";
import CamperSection from "./../CamperSection";
import CamperModel from "../../models/camper";
import {camperSectionUtils} from "../../utils/camper-utils";

const Camper = ({me=null}) => {
  let urlParams = useParams();
  let camperIdFromUrl = urlParams.camperId ? urlParams.camperId: null;
  // use K for kamper, so it is NOT too fearfully close in spelling to the React component Camper
  const [kamper, setKamper] = useState(null);

  const loadKamper = () => {
    (me ?
      api.run('camper/current') :
      api.run('camper', {id: camperIdFromUrl})
    )
      .then((response) => {
        if (response.data) {
          setKamper(new CamperModel(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveKamper = (data) => {
    const savePromise = api.run('camper', {action: 'update', id: kamper.id, ...data});
    return savePromise
      .then((response) => {
        if (response.data) {
          setKamper(new CamperModel(response.data));
        }
        if (response.errors) {
          throw new Error((response.errors instanceof Array) ? response.errors.join("; ") : response.errors);
        }
      });
  };

  useEffect(() => {
    if (!me && !camperIdFromUrl) {
      alert('no camper id specified');
      return;
    }
    loadKamper();
  }, [me]);

  return <section>
    {kamper ?
      <h1>Update {me ? 'My' : `${kamper.firstName} ${kamper.lastName}`} Info</h1>
      :
      <h1>Loading camper info...</h1>
    }
    {kamper && camperSectionUtils.getAllIds().map(k =>
      <CamperSection key={k} config={camperSectionUtils.getConfig(k)} camper={kamper} onSave={saveKamper}/>
    )}
  </section>
};

export default Camper;