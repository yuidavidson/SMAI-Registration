import React, {useEffect} from 'react';
import CamperModel, {camperSectionUtils, camperSectionModel} from "../../models/camper";

/**
 * @param {camperSectionModel} config
 * @param {CamperModel} camper
 * @returns {JSX.Element}
 * @constructor
 */
const CamperSection = ({config, camper}) => {
  return <section>
    <h1>{config.label}</h1>
    {camper && config.fields.map(f => <div>{f}: {camper[f]}</div>)}
  </section>
};

export default CamperSection;