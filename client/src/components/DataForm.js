import React, {useState, useEffect} from 'react';
import CamperModel from "../models/camper";

const DataForm = ({fields, data, onSubmit, onChange=null, onCancel=null}) => {
  const [formData, setFormData] = useState(data);
  useEffect(() => {
    setFormData(data);
    setChanged(false);
  }, [data]);

  const [isEdit, setEdit] = useState(false);
  useEffect(() => {
    if (!isEdit) {
      if (isChanged) {
        console.log('resetting changed data');
        setFormData(data); // reset data
        setChanged(false);
      }
      onCancel && onCancel(); // trigger cancel
    }
  }, [isEdit]);

  /**
   *
   * @param {Event?} e
   */
  const onEdit = e => {
    e && e.preventDefault();
    setEdit(edit => !edit); // toggle edit state
  };

  const [isChanged, setChanged] = useState(false);
  const onChangeInternal = e => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({...formData, [name]: (formData[name].type === 'number' ? parseInt(value):value)});
    setChanged(true);
    onChange && onChange(isChanged);
  };

  const [errors, setErrors] = useState({});
  const onSubmitInternalCb = e => {
    e.preventDefault();
    setErrors({});
    onSubmit(formData).then(
      response => {
        setChanged(false);
        setEdit(false);
      },
      error => {
        if (error.fields) {
          setErrors({...error.fields});
        }
      }
    );
  };

  const formatViewOnlyValue = v => {
    // double == null: null or undefined
    if (v == null || v === '') {
      return '(none)';
    }
    return v;
  };

  return (
    <form onSubmit={onSubmitInternalCb}>
      {fields.map(field =>
        <div key={field.id}>{!isEdit ?
          <span><strong>{field.label}</strong>: {formatViewOnlyValue(formData[field.id])}</span>
          :
          <React.Fragment>
            <label htmlFor={field.id}><strong>{field.label}</strong>:</label>


            {field.dict ?

              /* dictionary */
              (Object.keys(field.dict).length > 5 ?

                  <select onChange={onChangeInternal} name={field.id} value={formData[field.id]}>
                    <option>select an option</option>
                    {Object.keys(field.dict).map(k => <option key={k} value={k}>{field.dict[k]}</option>)}
                  </select>

                  :

                  Object.keys(field.dict).map(k =>
                    <React.Fragment key={k}>
                      <input id={`${field.id}__${k}`}
                             name={field.id}
                             type='radio'
                             checked={formData[field.id] === k}
                             value={k}
                             onChange={onChangeInternal}
                      />
                      <label htmlFor={`${field.id}__${k}`}>{field.dict[k]}</label>
                    </React.Fragment>
                  )
              )

              :

              /* non-dictionary */
              (field.type === 'bool' ?
                  <React.Fragment>
                    <label>Yes <input name={field.id} type='radio' value='1' checked={String(formData[field.id]) === '1'} onChange={onChangeInternal} /></label> :
                    <label>No <input name={field.id} type='radio' value='0' checked={String(formData[field.id]) === '0'} onChange={onChangeInternal} /></label>
                  </React.Fragment> :
                  <React.Fragment>
                    <input name={field.id} id={field.id} onChange={onChangeInternal} value={formData[field.id]} type={field.type} />
                  </React.Fragment>
              )

            }
          </React.Fragment>
        }
          {errors[field.id] && <span className='error'>&nbsp; {errors[field.id]}</span>}
        </div>)}
        <button type="button" onClick={onEdit} disabled={isEdit}>Edit</button>&nbsp;
        <button type="submit" onClick={onSubmitInternalCb} disabled={!isEdit}>Save</button>&nbsp;
        {isEdit && isChanged && <a href='#' onClick={onEdit}>Reset changes</a>}

    </form>
  );
};

export default DataForm;