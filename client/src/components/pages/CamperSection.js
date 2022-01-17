import React, {useEffect, useState} from 'react';
import CamperModel, {camperSectionUtils, camperSectionModel} from "../../models/camper";

/**
 * @param {camperSectionModel} config
 * @param {CamperModel} camper
 * @returns {JSX.Element}
 * @constructor
 */
const CamperSection = ({config, camper}) => {
  const [camperPart, setCamperPart] = useState(null);

  useEffect(() => {
    if (camper) {
      setCamperPart(Object.fromEntries(config.fields.map(f => [f, camper[f]])));
    } else {
      setCamperPart(null);
    }
  }, [camper]);

  return <section>
    <h1>{config.label}</h1>
    {camperPart && Object.keys(camperPart).map(k =>
      <div>{k}: {camperPart[k]}</div>
    )}
  </section>
};

export default CamperSection;