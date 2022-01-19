import React, {useEffect, useState, useRef} from 'react';

import DataForm from '../DataForm';
import CamperModel from "../../models/camper";
import {camperSectionUtils, camperSectionModel} from "../../utils/camper-utils";

/**
 * @param {camperSectionModel} config
 * @param {CamperModel} camper
 * @param {Function} onSave
 * @returns {JSX.Element}
 * @constructor
 */
const CamperSection = ({config, camper, onSave}) => {
  const [data, setData] = useState(null);
  const [wasSaved, setWasSaved] = React.useState(false);
  const [saveError, setSaveError] = React.useState('');

  // make save message hide after a timeout
  const hideSavedTimeout = useRef(null);
  useEffect(() => {
    if (wasSaved) {
      if (!hideSavedTimeout.current) {
        clearTimeout(hideSavedTimeout.current);
        hideSavedTimeout.current = null;
      }

      hideSavedTimeout.current = setTimeout(() => {
        setWasSaved(false);
      }, 2000);
    }
    // clean-up timeout if component gets dismounted before completion
    return () => {
      if (hideSavedTimeout.current) {
        clearTimeout(hideSavedTimeout.current);
      }
    }
  }, [wasSaved]);

  useEffect(() => {
    if (camper) {
      setData(Object.fromEntries(config.fields.map(f => [f, camper[f]])));
    } else {
      setData(null);
    }
  }, [camper]);

  const onSaveInternal = (newData) => {
    const savePromise = onSave(newData);
    savePromise.then(() => {
      setWasSaved(true);
      setSaveError(false);
    }).catch((error) => {
      setWasSaved(false);
      setSaveError((error instanceof Error) ? error.message : error);
    });
    return savePromise; // returns Promise from parent call (likely API call)
  };

  return <section>
    <h1>{config.label}</h1>
    {wasSaved && <div style={{color: 'green'}}>Successfully saved changes</div>}
    {saveError && <div style={{color: 'red'}}>Your updates did not save: {saveError}</div>}
    {data &&
      <DataForm
        fields={config.fields.map(id => ({
          id,
          label: id.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/(^| )[a-z]/, s => s.toUpperCase()),
          ...CamperModel.config[id]
        }))}
        data={data}
        onSubmit={onSaveInternal}
      />}
  </section>
};

export default CamperSection;