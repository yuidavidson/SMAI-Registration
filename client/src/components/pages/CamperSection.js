import React, {useEffect, useState, useCallback} from 'react';

import DataForm from '../DataForm';
import CamperModel from "../../models/camper";
import {camperSectionUtils, camperSectionModel} from "../../utils/camper-utils";

/**
 * @param {camperSectionModel} config
 * @param {CamperModel} camper
 * @returns {JSX.Element}
 * @constructor
 */
const CamperSection = ({config, camper, onSaveCb}) => {
  const [data, setData] = useState(null);
  const [submitText, setSubmitText] = React.useState('');

  useEffect(() => {
    if (camper) {
      setData(Object.fromEntries(config.fields.map(f => [f, camper[f]])));
    } else {
      setData(null);
    }
  }, [camper]);

  const onSave = (newData) => {
    setData(newData);
    return new Promise((res, rej) => { setTimeout(() => {res(1); }, 1000)});
  };

  return <section>
    <h1>{config.label}</h1>
    {data &&
      <DataForm
        fields={config.fields.map(id => ({
          id,
          label: id.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/(^| )[a-z]/, s => s.toUpperCase()),
          ...CamperModel.config[id]
        }))}
        data={data}
        onSubmit={onSave}
      />}
  </section>
};

export default CamperSection;