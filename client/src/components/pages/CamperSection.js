import React, {useEffect, useState} from 'react';
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


  useEffect(() => {
    if (camper) {
      setData(Object.fromEntries(config.fields.map(f => [f, camper[f]])));
    } else {
      setData(null);
    }
  }, [camper]);

  const [submitText, setSubmitText] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(false);

  const onChangeCb = e => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData({...data, [name]: (data[name].type === 'number' ? parseInt(value):value)});
    setIsChanged(true);
  };



  const onSubmitInternalCb = e => {
    e.preventDefault();
    onSaveCb(data);
    // TODO wire up to promise of onSave from parent
    setSubmitText('Saved!');
  };

  const onStartOverCb = e => {
    setSubmitText('');
    setData(initialFormState);
    console.log('started over');
  };


  return <section>
    <h1>{config.label}</h1>
    <a href='#edit' onClick={e => {e.preventDefault(); setIsEdit(s => !s)}}>{isEdit ? 'cancel edit':'Edit'}</a>
    {data && <form onSubmit={onSubmitInternalCb}>
      {config.fields.map(id => ({
        id,
        label: id.replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/(^| )[a-z]/, s => s.toUpperCase()),
        config: CamperModel.config[id],
        value: data[id]
      })).map(field =>
      <div key={field.id}>{!isEdit ?
        <span><strong>{field.label}</strong>: {field.value}</span>
        :
        <React.Fragment>
          <label htmlFor={field.id}><strong>{field.label}</strong>:</label>


          {field.config.dict ?

            /* dictionary */
            (Object.keys(field.config.dict).length > 5 ?

              <select onChange={onChangeCb} name={field.id} value={field.value}>
                <option>select an option</option>
                {Object.keys(field.config.dict).map(k => <option key={k}>{field.config.dict[k]}</option>)}
              </select>

              :

              Object.keys(field.config.dict).map(k =>
                <React.Fragment key={k}>
                  <input id={`${field.id}__${k}`}
                         name={field.id}
                         type='radio'
                         checked={field.value === k}
                         value={k}
                         onChange={onChangeCb}
                  />
                  <label htmlFor={`${field.id}__${k}`}>{field.config.dict[k]}</label>
                </React.Fragment>
              )
            )

             :

            /* non-dictionary */
            (field.config.type === 'bool' ?
                <React.Fragment>
                  <label>Yes <input name={field.id} value={1} checked={!!field.value} onChange={onChangeCb} /></label> :
                  <label>No <input name={field.id} value={0} checked={!field.value} onChange={onChangeCb} /></label>
                </React.Fragment> :
                <React.Fragment>
                  <input name={field.id} id={field.id} onChange={onChangeCb} value={field.value} type={field.config.type} />
                </React.Fragment>
            )

          }
        </React.Fragment>
      }</div>)}
    </form>}
  </section>
};

export default CamperSection;